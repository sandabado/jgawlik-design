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
    slug: 'design', name: 'Design', title: 'The Trust Harness', pillar: 'air',
    body: 'Mental', glyph: '⊙', prompt: 'I need to build.', status: 'active',
    statusLabel: 'Active — Case studies in review', visualMode: 'professional',
    summary: 'Where the institutional work lives. Fourteen years inside Fortune 100 rooms. Building systems that don’t extract — they hold. The Trust Harness is live R&D: compressed cycles, human override, verifiable outcomes.',
    cta: { label: 'Enter the work', href: '/design' },
    seoKeywords: ['Product Designer', 'Systems Architect', 'Trust Harness', 'TETRA', 'LinkedIn', 'Enterprise UX'],
  },
  {
    slug: 'music', name: 'Music', title: 'The Vibration', pillar: 'water',
    body: 'Emotional', glyph: '🜄', prompt: 'I need to hear the song.', status: 'active',
    statusLabel: 'Records live · Debut in preparation', visualMode: 'ethereal',
    summary: 'Sound as memory. Songs that remember us. Whole Body Records. Sandābādo. The catalog is live. The debut is tuning. Every track is a frequency map of what we carry.',
    cta: { label: 'Enter the studio', href: '/music' }, sourceUrl: 'https://www.wholebody.studio/',
    seoKeywords: ['Sandābādo', 'Whole Body Records', 'Whole Body Studios', 'Music'],
  },
  {
    slug: 'manuals', name: 'Manuals', title: 'The Written Bone', pillar: 'air',
    body: 'Mental', glyph: '🜁', prompt: 'I need to understand the pattern.', status: 'preview',
    statusLabel: 'Manual I previewing', visualMode: 'ethereal',
    summary: 'Words that outlast the voice. The Living Body Series. Five volumes from presence to trust. Manual I is open. Four more wait in the wings.',
    cta: { label: 'Enter the library', href: '/manuals' }, sourceUrl: 'https://www.wholebody.press/',
    seoKeywords: ['Living Body Series', 'Whole Body Presence', 'Whole Body Press', 'Manual I'],
  },
  {
    slug: 'community', name: 'Community', title: 'The Held Space', pillar: 'fire',
    body: 'Spiritual', glyph: '🜂', prompt: 'I need to feel the heat.', status: 'preview',
    statusLabel: 'Invite-only beta · Open access 2027', visualMode: 'ethereal',
    summary: 'Not a funnel. A fire. Men’s circles. Women’s circles. Weekly flame. No fixing. No advice. Just enough room for what’s true to rise.',
    cta: { label: 'Enter the fire', href: '/community' },
    seoKeywords: ['Whole Body Presence', 'Circles', 'Community'],
  },
  {
    slug: 'foundation', name: 'Foundation', title: 'The Open Expanse', pillar: 'earth',
    body: 'Physical', glyph: '🜃', prompt: 'I need solid ground.', status: 'development',
    statusLabel: 'Research phase', visualMode: 'ethereal',
    summary: 'The desert is not empty. It’s full of information. Eastern Mojave. Regenerative growth. Water discipline. Carrying capacity. Nothing here is a promise — it’s all a lesson.',
    cta: { label: 'Enter the field', href: '/foundation' },
    seoKeywords: ['Whole Body Foundation', 'Fieldwork', 'Land stewardship', 'Research'],
  },
  {
    slug: 'guardian', name: 'Guardian', title: 'The Boundary', pillar: 'ether',
    body: 'Ethereal', glyph: '☉', prompt: 'I need to protect what matters.', status: 'development',
    statusLabel: 'In development', visualMode: 'ethereal',
    summary: 'Agreements that let everything else breathe. Sovereign tools. Invisible architecture. The door is marked.',
    cta: { label: 'Request the agreements', href: '/guardian' },
    seoKeywords: ['Whole Body Guardian', 'Sovereign tools', 'Agreements', 'Stewardship'],
  },
] as const satisfies readonly PillarEntry[];

export type PillarSlug = typeof pillars[number]['slug'];
export const getPillar = (slug: PillarSlug) => pillars.find((item) => item.slug === slug)!;

export const compassDestinations: Record<PillarSlug, string> = {
  design: 'Design — Trust harnesses for real people',
  music: 'Music — Vibration as record',
  manuals: 'Manuals — Words that outlive the speaker',
  community: 'Community — Circles where hearts open',
  foundation: 'Foundation — The desert as teacher',
  guardian: 'Guardian — Agreements that hold',
};

// Five energy points around one center; Design is an additional professional door.
export const compassPillars: readonly PillarEntry[] = ['community', 'manuals', 'guardian', 'music', 'foundation']
  .map((slug) => getPillar(slug as PillarSlug));
