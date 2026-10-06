import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { lstat, mkdir, readFile, readlink, symlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';
import { syncDevSource } from './dev-source.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectories = ['src', 'public', 'tokens'];
const profiles = {
  gate: { port: 3000, gate: 'true', portfolio: 'false', dist: '.next' },
  site: { port: 3001, gate: 'false', portfolio: 'false', dist: '.next' },
  portfolio: { port: 3002, gate: 'true', portfolio: 'true', dist: '.next-portfolio' },
};
const mode = process.argv[2];
const profile = Object.hasOwn(profiles, mode) ? profiles[mode] : undefined;
if (!profile || process.argv.length !== 3) {
  process.stderr.write('Use npm run dev, npm run dev:site, or npm run dev:portfolio. Each command uses its fixed loopback port.\n');
  process.exit(1);
}

async function link(name, directory) {
  const target = join(root, name);
  const destination = join(directory, name);
  try {
    const current = await lstat(destination);
    if (!current.isSymbolicLink() || resolve(directory, await readlink(destination)) !== target) {
      throw new Error(`Unexpected file at .dev/${mode}/${name}; move it before starting development.`);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await symlink(target, destination, 'file');
  }
}

async function writeIfChanged(file, content) {
  try { if (await readFile(file, 'utf8') === content) return; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await writeFile(file, content);
}

try {
  // Next's CLI can exit successfully after an occupied-port error. Detect it
  // before generating files, and never silently choose another port.
  await new Promise((accept, reject) => {
    const probe = createServer();
    probe.once('error', () => reject(new Error(`Port ${profile.port} is unavailable. Stop its server before restarting this experience.`)));
    probe.listen(profile.port, '127.0.0.1', () => probe.close((error) => error ? reject(error) : accept()));
  });
  const require = createRequire(import.meta.url);
  const { loadEnvConfig } = require('@next/env');
  process.env.NODE_ENV = 'development';
  loadEnvConfig(root, true);
  const environment = { ...process.env };
  if (mode === 'portfolio') {
    try { Object.assign(environment, parseEnv(await readFile(join(root, '.env.portfolio.local'), 'utf8'))); }
    catch (error) {
      if (error.code === 'ENOENT') throw new Error('Run npm run portfolio:setup in the project directory first.');
      throw new Error('Unable to read the private portfolio configuration.');
    }
  } else {
    // These two processes do not need reviewer credentials, even if inherited.
    delete environment.PORTFOLIO_ACCESS_HASH;
    delete environment.PORTFOLIO_SESSION_SECRET;
    delete environment.UPSTASH_REDIS_REST_URL;
    delete environment.UPSTASH_REDIS_REST_TOKEN;
  }
  Object.assign(environment, {
    NODE_ENV: 'development',
    PUBLIC_GATE: profile.gate,
    PORTFOLIO_MODE: profile.portfolio,
    PORT: String(profile.port),
  });

  // Next 15 writes next-env.d.ts into its project root. Separate roots isolate
  // those files, route types and webpack caches. Physical source views let its
  // route watcher discover changes; directory symlinks are not traversed.
  const directory = join(root, '.dev', mode);
  await mkdir(directory, { recursive: true });
  for (const name of ['postcss.config.mjs', 'eslint.config.mjs']) await link(name, directory);
  for (const name of sourceDirectories) await syncDevSource(join(root, name), join(directory, name));
  await writeIfChanged(join(directory, 'package.json'), `${JSON.stringify({ name: `jgawlik-dev-${mode}`, private: true }, null, 2)}\n`);
  await writeIfChanged(join(directory, 'next.config.ts'), "import config from '../../next.config';\nexport default config;\n");
  await writeIfChanged(join(directory, 'tsconfig.json'), `${JSON.stringify({
    extends: '../../tsconfig.json',
    compilerOptions: {
      baseUrl: '.',
      paths: { '@/*': ['./src/*'] },
      typeRoots: ['../../node_modules/@types'],
      tsBuildInfoFile: `./${profile.dist}/cache/typescript.tsbuildinfo`,
    },
    include: ['next-env.d.ts', 'src/**/*.ts', 'src/**/*.tsx', `${profile.dist}/types/**/*.ts`],
    exclude: ['node_modules'],
  }, null, 2)}\n`);

  const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--port', String(profile.port), '--hostname', '127.0.0.1'], {
    cwd: directory,
    env: environment,
    stdio: 'inherit',
  });
  const watchers = [];
  let timer;
  let syncing = false;
  let pending = false;
  let stopped = false;
  const stop = () => {
    stopped = true;
    clearTimeout(timer);
    for (const watcher of watchers) watcher.close();
  };
  child.on('error', () => { stop(); process.stderr.write('Unable to start the development server.\n'); process.exitCode = 1; });
  child.on('exit', (code, signal) => { stop(); process.exitCode ||= code ?? (signal === 'SIGINT' ? 0 : 1); });
  const synchronize = async () => {
    if (stopped) return;
    if (syncing) { pending = true; return; }
    syncing = true;
    try {
      do {
        pending = false;
        for (const name of sourceDirectories) await syncDevSource(join(root, name), join(directory, name));
      } while (pending && !stopped);
    } catch {
      process.stderr.write('Unable to synchronize development source. Restart this server.\n');
      process.exitCode = 1;
      stop();
      child.kill('SIGTERM');
    } finally { syncing = false; }
  };
  for (const name of sourceDirectories) {
    let watcher;
    try {
      watcher = watch(join(root, name), { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(synchronize, 80);
      });
    } catch {
      stop();
      child.kill('SIGTERM');
      throw new Error('Unable to watch development source. Restart this server.');
    }
    watcher.on('error', () => {
      process.stderr.write('Unable to watch development source. Restart this server.\n');
      process.exitCode = 1;
      stop();
      child.kill('SIGTERM');
    });
    watchers.push(watcher);
  }
  // Close the small startup window between the initial copy and watcher setup.
  await synchronize();
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { stop(); child.kill(signal); });
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : 'Unable to start development.'}\n`);
  process.exitCode = 1;
}
