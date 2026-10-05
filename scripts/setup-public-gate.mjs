import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, chmodSync, existsSync } from 'node:fs';
import { parseEnv } from 'node:util';

const path = '.env.local';
let content = existsSync(path) ? readFileSync(path, 'utf8') : '# Local gate configuration. Never commit this file.\n';
const configured = parseEnv(content);
// Dotenv uses the last assignment. Preserve quoted/exported values and unrelated
// configuration; append a replacement only when the effective secret is invalid.
const setValue = (key, value) => {
  content = `${content.trimEnd()}\n${key}=${value}\n`;
};
if (configured.PUBLIC_GATE === undefined) setValue('PUBLIC_GATE', 'true');
if (!/^[A-Za-z0-9_-]{43,128}$/.test(configured.PREVIEW_BYPASS_SECRET ?? '')) {
  setValue('PREVIEW_BYPASS_SECRET', randomBytes(32).toString('base64url'));
}
writeFileSync(path, content, { mode: 0o600 });
chmodSync(path, 0o600);
console.log('Local gate configuration ready in .env.local. No secret values were printed. Restart the dev server after environment changes.');
