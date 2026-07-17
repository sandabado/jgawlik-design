import { readFile } from 'node:fs/promises';

const requiredColors = ['background', 'surface-1', 'surface-2', 'foreground', 'ember', 'gold', 'muted'];
const tokens = JSON.parse(await readFile(new URL('../tokens/design-tokens.json', import.meta.url), 'utf8'));
const missing = requiredColors.filter((name) => !tokens.colors?.[name]?.value);
if (missing.length) throw new Error(`Missing required design tokens: ${missing.join(', ')}`);
if (!tokens.spacing || !tokens.typography || !tokens.borderRadius) throw new Error('Design tokens must include typography, spacing, and border radius groups.');
console.log('Design tokens are valid.');
