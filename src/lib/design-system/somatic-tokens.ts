import type { CSSProperties } from 'react';
import type { PillarSlug } from '@/lib/data/pillars';
import designTokens from '../../../tokens/design-tokens.json';

/** Stage 1 specimen values; legacy and launched surfaces keep their own tokens. */
export const somaticTokens = designTokens.somatic;

export type SomaticVariables = CSSProperties & {
  [property: `--somatic-${string}`]: string | number;
};

export function somaticVariables(): SomaticVariables {
  const { colors, typography, texture } = somaticTokens;
  return {
    '--somatic-field': colors.field.value,
    '--somatic-surface': colors.surface.value,
    '--somatic-ink': colors.ink.value,
    '--somatic-muted': colors.muted.value,
    '--somatic-gold': colors.gold.value,
    '--somatic-focus': colors.focus.value,
    '--somatic-line': colors.line.value,
    '--somatic-display-font': typography.displayFont.value,
    '--somatic-body-font': typography.bodyFont.value,
    '--somatic-display-size': typography.displaySize.value,
    '--somatic-body-size': typography.bodySize.value,
    '--somatic-caption-size': typography.captionSize.value,
    '--somatic-display-line-height': typography.displayLineHeight.value,
    '--somatic-body-line-height': typography.bodyLineHeight.value,
    '--somatic-grain-opacity': texture.grainOpacity.value,
    '--somatic-paper-opacity': texture.paperOpacity.value,
    '--somatic-lineline-width': texture.linelineWidth.value,
    '--somatic-rim-opacity': texture.rimOpacity.value,
  };
}

export function somaticRoomVariables(slug: PillarSlug): SomaticVariables {
  const room = somaticTokens.rooms[slug];
  return {
    '--somatic-room-field': room.field.value,
    '--somatic-room-surface': room.surface.value,
    '--somatic-room-accent': room.accent.value,
    '--somatic-room-secondary': room.secondary.value,
  };
}
