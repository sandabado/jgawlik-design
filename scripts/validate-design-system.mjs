import { readFile } from 'node:fs/promises';

const requiredColors = ['background', 'surface-1', 'surface-2', 'foreground', 'ember', 'gold', 'muted'];
const tokens = JSON.parse(await readFile(new URL('../tokens/design-tokens.json', import.meta.url), 'utf8'));
const missing = requiredColors.filter((name) => !tokens.colors?.[name]?.value);
if (missing.length) throw new Error(`Missing required design tokens: ${missing.join(', ')}`);
if (!tokens.spacing || !tokens.typography || !tokens.borderRadius) throw new Error('Design tokens must include typography, spacing, and border radius groups.');

const hexColor = /^#[0-9a-f]{6}$/i;
const pixelDimension = /^(\d+(?:\.\d+)?)px$/;
const responsiveDimension = /^clamp\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)vw,\s*(\d+(?:\.\d+)?)px\)$/;

function tokenValue(group, name, type, path) {
  const token = group?.[name];
  if (!token || token.type !== type) throw new Error(`${path}.${name} must be a ${type} token.`);
  const value = token.value;
  if (type === 'color' && (typeof value !== 'string' || !hexColor.test(value))) throw new Error(`${path}.${name} must be a six-digit hexadecimal color.`);
  if (type === 'dimension' && (typeof value !== 'string' || (!pixelDimension.test(value) && !responsiveDimension.test(value)))) throw new Error(`${path}.${name} must use pixels or a responsive px/vw/px clamp.`);
  if (type === 'fontFamily' && (typeof value !== 'string' || !value.trim())) throw new Error(`${path}.${name} must name a font family.`);
  if (type === 'number' && (typeof value !== 'number' || !Number.isFinite(value))) throw new Error(`${path}.${name} must be a finite number.`);
  return value;
}

for (const name of requiredColors) tokenValue(tokens.colors, name, 'color', 'colors');
for (const name of ['display', 'body', 'mono']) tokenValue(tokens.typography, name, 'fontFamily', 'typography');
for (const [groupName, group] of [['spacing', tokens.spacing], ['borderRadius', tokens.borderRadius]]) {
  for (const name of Object.keys(group)) tokenValue(group, name, 'dimension', groupName);
}

const somatic = tokens.somatic;
if (!somatic) throw new Error('Missing somatic token namespace.');
const roomNames = ['music', 'foundation', 'community', 'manuals', 'design', 'guardian'];
if (Object.keys(somatic.rooms ?? {}).sort().join(',') !== [...roomNames].sort().join(',')) throw new Error('Somatic rooms must contain exactly the six approved pillar slugs.');
for (const name of ['field', 'surface', 'ink', 'muted', 'gold', 'focus', 'line']) tokenValue(somatic.colors, name, 'color', 'somatic.colors');
for (const name of ['displayFont', 'bodyFont']) tokenValue(somatic.typography, name, 'fontFamily', 'somatic.typography');
for (const name of ['displaySize', 'bodySize', 'captionSize']) tokenValue(somatic.typography, name, 'dimension', 'somatic.typography');
for (const name of ['displayLineHeight', 'bodyLineHeight']) {
  const height = tokenValue(somatic.typography, name, 'number', 'somatic.typography');
  if (height <= 0 || height > 2) throw new Error(`somatic.typography.${name} must be a positive line height no greater than 2.`);
}
for (const name of ['grainOpacity', 'paperOpacity', 'rimOpacity']) {
  const opacity = tokenValue(somatic.texture, name, 'number', 'somatic.texture');
  if (opacity < 0 || opacity > 1) throw new Error(`somatic.texture.${name} must be between 0 and 1.`);
}
if (somatic.texture.grainOpacity.value !== 0.03) throw new Error('Stage 1 grain opacity must remain 0.03.');
if (somatic.texture.paperOpacity.value > 0.04) throw new Error('Paper texture opacity must remain subtle (at most 0.04).');
const lineline = tokenValue(somatic.texture, 'linelineWidth', 'dimension', 'somatic.texture');
if (!pixelDimension.test(lineline) || Number.parseFloat(lineline) <= 0 || Number.parseFloat(lineline) > 2) throw new Error('Gold lineline must be a positive width at most 2px.');

function dimensionAtWidth(value, width) {
  const pixels = value.match(pixelDimension);
  if (pixels) return Number(pixels[1]);
  const clamp = value.match(responsiveDimension);
  if (!clamp) throw new Error(`Unsupported responsive size: ${value}`);
  const [, minimum, viewport, maximum] = clamp.map(Number);
  if (minimum > maximum || minimum <= 0 || viewport <= 0) throw new Error(`Invalid responsive size: ${value}`);
  return Math.min(maximum, Math.max(minimum, width * viewport / 100));
}
for (const width of [1024, 1280, 1440]) {
  if (dimensionAtWidth(somatic.typography.displaySize.value, width) < 120) throw new Error(`Hero display must be at least 120px at ${width}px desktop width.`);
}
for (const width of [320, 390, 1024, 1440]) {
  if (dimensionAtWidth(somatic.typography.bodySize.value, width) < 16) throw new Error('Somatic body copy must be at least 16px.');
  if (dimensionAtWidth(somatic.typography.captionSize.value, width) < 12) throw new Error('Somatic captions must be at least 12px.');
}

function luminance(hex) {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const [dark, light] = [luminance(foreground), luminance(background)].sort((a, b) => a - b);
  return (light + 0.05) / (dark + 0.05);
}

const contrastChecks = [];
function requireContrast(label, foreground, background, minimum) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) throw new Error(`${label} contrast ${ratio.toFixed(2)}:1 is below ${minimum}:1.`);
  contrastChecks.push({ label, ratio, minimum });
}

const colors = somatic.colors;
if (colors.field.value.toLowerCase() === '#000000') throw new Error('Somatic field must be deep indigo, never pure black.');
for (const surfaceName of ['field', 'surface']) {
  const surface = colors[surfaceName].value;
  for (const name of ['ink', 'muted', 'gold']) requireContrast(`Shared ${name} on ${surfaceName}`, colors[name].value, surface, 4.5);
  requireContrast(`Shared focus on ${surfaceName}`, colors.focus.value, surface, 3);
}
for (const name of roomNames) {
  const room = somatic.rooms[name];
  for (const key of ['field', 'surface', 'accent', 'secondary']) tokenValue(room, key, 'color', `somatic.rooms.${name}`);
  if (room.field.value.toLowerCase() === '#000000') throw new Error(`${name} field cannot be pure black.`);
  if (room.field.value !== colors.field.value) throw new Error(`${name} must share the deep-indigo field.`);
  for (const surfaceName of ['field', 'surface']) {
    const surface = room[surfaceName].value;
    for (const textName of ['ink', 'muted', 'gold']) requireContrast(`${name} ${textName} on ${surfaceName}`, colors[textName].value, surface, 4.5);
    for (const textName of ['accent', 'secondary']) requireContrast(`${name} ${textName} on ${surfaceName}`, room[textName].value, surface, 4.5);
    requireContrast(`${name} focus on ${surfaceName}`, colors.focus.value, surface, 3);
  }
}
const minimumText = Math.min(...contrastChecks.filter((check) => check.minimum === 4.5).map((check) => check.ratio));
const minimumFocus = Math.min(...contrastChecks.filter((check) => check.minimum === 3).map((check) => check.ratio));
console.log(`Design tokens are valid. Somatic: six rooms, ${contrastChecks.length} solid-color contrast checks; minimum text ${minimumText.toFixed(2)}:1, focus ${minimumFocus.toFixed(2)}:1. Texture composites require rendered verification.`);
