import { lstat, mkdir, readFile, readdir, readlink, rm, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

/** Generated dev views only; the repository's source remains authoritative. */
export async function syncDevSource(source, destination) {
  try {
    const current = await lstat(destination);
    if (current.isSymbolicLink()) {
      if (resolve(destination, '..', await readlink(destination)) !== source) throw new Error('Unexpected link in the development view.');
      await unlink(destination);
    } else if (!current.isDirectory()) await rm(destination);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });
  const names = new Set(entries.map((entry) => entry.name));
  for (const entry of entries) {
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) await syncDevSource(from, to);
    else if (entry.isFile()) {
      const contents = await readFile(from);
      try {
        const current = await lstat(to);
        if (current.isSymbolicLink()) throw new Error('Unexpected link in the development view.');
        if (current.isDirectory()) await rm(to, { recursive: true });
        else if ((await readFile(to)).equals(contents)) continue;
      } catch (error) { if (error.code !== 'ENOENT') throw error; }
      await writeFile(to, contents);
    } else throw new Error('Source links are unsupported in the generated development view.');
  }
  for (const entry of await readdir(destination)) {
    if (!names.has(entry)) await rm(join(destination, entry), { recursive: true, force: true });
  }
}
