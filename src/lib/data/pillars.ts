import type { ContentItem, VisualMode } from '@/lib/types';

export interface PillarEntry extends ContentItem {
  name: string;
  body: string;
  glyph: string;
  prompt: string;
  statusLabel: string;
  visualMode: VisualMode;
  sourceUrl?: string;
  seoKeywords: readonly string[];
}

/** Owner-approved copy, 5 October 2026. Status changes belong here, not in JSX. */
export const pillars = [
  {
    slug: 'design', name: 'Design', title: 'The built system', pillar: 'air',
    body: 'Mental', glyph: '⊙', prompt: 'I want to build', status: 'active',
    statusLabel: 'Active — Case studies in review', visualMode: 'professional',
    summary: 'Where the trust work lives. Principal product design and agentic systems — the Trust Harness currently stress-tested inside a Fortune 100 environment. Visible logic. Human override. Verifiable outcomes.',
    cta: { label: 'Enter the work', href: '/design' },
    seoKeywords: ['Product Designer', 'Systems Architect', 'Trust Harness', 'TETRA', 'LinkedIn', 'Enterprise UX'],
  },
  {
    slug: 'music', name: 'Music', title: 'What the water carries', pillar: 'water',
    body: 'Emotional', glyph: '🜄', prompt: 'I feel something stirring', status: 'active',
    statusLabel: 'Records live · Debut in preparation', visualMode: 'ethereal',
    summary: 'Sound as record. The songs remember. Whole Body Studios and Whole Body Records — an artist-owned house where the makers eat first. The Sandābādo catalog is live; the debut release is in preparation.',
    cta: { label: 'Enter the studio', href: '/music' }, sourceUrl: 'https://www.wholebody.studio/',
    seoKeywords: ['Sandābādo', 'Whole Body Records', 'Whole Body Studios', 'Music'],
  },
  {
    slug: 'manuals', name: 'Manuals', title: 'The written bones', pillar: 'air',
    body: 'Mental', glyph: '🜁', prompt: 'I want to understand', status: 'preview',
    statusLabel: 'Manual I previewing', visualMode: 'ethereal',
    summary: 'Words that outlive the speaker. The Living Body Series — five volumes from the foundation of presence to the engineering of trust. Manual I is open in public preview; four more rest in editorial hold.',
    cta: { label: 'Enter the library', href: '/manuals' }, sourceUrl: 'https://www.wholebody.press/',
    seoKeywords: ['Living Body Series', 'Whole Body Presence', 'Whole Body Press', 'Manual I'],
  },
  {
    slug: 'community', name: 'Community', title: 'The held space', pillar: 'fire',
    body: 'Spiritual', glyph: '🜂', prompt: 'I want to be in the room', status: 'preview',
    statusLabel: 'Invite-only beta · Open access 2027', visualMode: 'ethereal',
    summary: "A ceremony, not a funnel. Whole Body Presence — men's circles, women's circles, the weekly fire. Five energies, twelve houses, real rooms. No fixing. No advice. Enough space for what's true.",
    cta: { label: 'Enter the fire', href: '/community' },
    seoKeywords: ['Whole Body Presence', 'Circles', 'Community'],
  },
  {
    slug: 'foundation', name: 'Foundation', title: 'The ground itself', pillar: 'earth',
    body: 'Physical', glyph: '🜃', prompt: 'I need something real', status: 'development',
    statusLabel: 'Research phase', visualMode: 'ethereal',
    summary: 'The desert is not empty. It is information-dense. Eastern Mojave fieldwork — baseline geophysics, regenerative growing, water discipline, and the honest reading of carrying capacity. Nothing public is a promise of physical performance.',
    cta: { label: 'Enter the field', href: '/foundation' },
    seoKeywords: ['Whole Body Foundation', 'Fieldwork', 'Land stewardship', 'Research'],
  },
  {
    slug: 'guardian', name: 'Guardian', title: 'The boundary that holds', pillar: 'ether',
    body: 'Ethereal', glyph: '☉', prompt: 'I want to protect it', status: 'development',
    statusLabel: 'In development', visualMode: 'ethereal',
    summary: 'Agreements, stewardship, protection. The Ether pillar: the invisible architecture that lets every other body remain sovereign. The door is marked.',
    cta: { label: 'Request the agreements', href: '/guardian' },
    seoKeywords: ['Whole Body Guardian', 'Sovereign tools', 'Agreements', 'Stewardship'],
  },
] as const satisfies readonly PillarEntry[];

export type PillarSlug = typeof pillars[number]['slug'];
export const getPillar = (slug: PillarSlug) => pillars.find((item) => item.slug === slug)!;

// Five energy points around one center; Design is an additional professional door.
export const compassPillars: readonly PillarEntry[] = ['community', 'manuals', 'guardian', 'music', 'foundation']
  .map((slug) => getPillar(slug as PillarSlug));
