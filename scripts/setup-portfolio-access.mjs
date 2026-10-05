import { randomBytes, scrypt } from 'node:crypto';
import { chmod, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { StringDecoder } from 'node:string_decoder';
import { parseEnv } from 'node:util';

const target = resolve(process.cwd(), '.env.portfolio.local');
const supported = new Set(['--stdin']);
if (process.argv.slice(2).some((argument) => !supported.has(argument))) {
  process.stderr.write('Usage: node scripts/setup-portfolio-access.mjs [--stdin]\n');
  process.exit(1);
}

async function hiddenPrompt(label) {
  if (!process.stdin.isTTY || !process.stdin.setRawMode) throw new Error('Use an interactive terminal or --stdin.');
  process.stdout.write(label);
  return new Promise((resolvePassword, reject) => {
    let password = '';
    const decoder = new StringDecoder('utf8');
    const restore = () => {
      process.stdin.off('data', onData);
      process.stdin.off('error', onError);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
    };
    const onError = () => { restore(); reject(new Error('Password entry cancelled.')); };
    const onData = (chunk) => {
      for (const character of decoder.write(chunk)) {
        if (character === '\u0003' || character === '\u0004') { restore(); reject(new Error('Password entry cancelled.')); return; }
        if (character === '\r' || character === '\n') { restore(); resolvePassword(password); return; }
        if (character === '\u007f' || character === '\b') { password = Array.from(password).slice(0, -1).join(''); continue; }
        if (character >= ' ') password += character;
        if (password.length > 256) { restore(); reject(new Error('Password must contain 16–256 characters.')); return; }
      }
    };
    process.stdin.setRawMode(true);
    process.stdin.on('data', onData);
    process.stdin.on('error', onError);
    process.stdin.resume();
  });
}

async function stdinPassword() {
  let input = '';
  const decoder = new StringDecoder('utf8');
  for await (const chunk of process.stdin) {
    input += decoder.write(chunk);
    if (Buffer.byteLength(input) > 2048) throw new Error('Password input is too long.');
  }
  input += decoder.end();
  const password = input.replace(/\r?\n$/, '');
  if (password.includes('\n') || password.includes('\r')) throw new Error('Provide a single password line.');
  return password;
}

try {
  let password = process.argv.includes('--stdin') ? await stdinPassword() : await hiddenPrompt('Portfolio password (hidden): ');
  if (password.length < 16 || password.length > 256) throw new Error('Password must contain 16–256 characters.');
  if (!process.argv.includes('--stdin') && password !== await hiddenPrompt('Confirm password (hidden): ')) throw new Error('Passwords do not match.');
  const salt = randomBytes(16);
  const key = await new Promise((resolveKey, reject) => {
    scrypt(password, salt, 32, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 }, (error, derived) => {
      if (error) reject(new Error('Unable to configure portfolio access.'));
      else resolveKey(derived);
    });
  });
  password = '';
  let existing;
  try { existing = await readFile(target, 'utf8'); }
  catch (error) {
    if (error.code !== 'ENOENT') throw new Error('Unable to read portfolio environment file.');
    existing = '# Private local portfolio configuration. Never commit this file.\n';
  }
  const previous = parseEnv(existing);
  const sessionSecret = /^[A-Za-z0-9_-]{43,128}$/.test(previous.PORTFOLIO_SESSION_SECRET ?? '')
    ? previous.PORTFOLIO_SESSION_SECRET
    : randomBytes(32).toString('base64url');
  const values = {
    PORTFOLIO_MODE: 'true',
    PUBLIC_GATE: 'true',
    PORTFOLIO_ACCESS_HASH: `scrypt:32768:8:3:${salt.toString('base64url')}:${key.toString('base64url')}`,
    PORTFOLIO_SESSION_SECRET: sessionSecret,
  };
  // dotenv uses the final assignment. Preserve unrelated values and never print
  // the resulting verifier, signing secret, or password to the terminal.
  const updates = Object.entries(values).filter(([name, value]) => previous[name] !== value);
  const document = `${existing.trimEnd()}\n${updates.map(([name, value]) => `${name}='${value}'`).join('\n')}\n`;
  // Restrict an existing file before writing secrets, even if it was empty.
  try { await chmod(target, 0o600); }
  catch (error) { if (error.code !== 'ENOENT') throw new Error('Unable to secure portfolio environment file.'); }
  await writeFile(target, document, { mode: 0o600 });
  await chmod(target, 0o600);
  process.stdout.write('Portfolio access configured in .env.portfolio.local. Restart the portfolio server after changes.\n');
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : 'Unable to configure portfolio access.'}\n`);
  process.exitCode = 1;
}
