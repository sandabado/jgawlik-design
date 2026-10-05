import type { Metadata } from 'next';
import { getPillar, type PillarSlug } from '@/lib/data/pillars';
import { isPublicGateEnabled } from '@/lib/gating/config';
import { isPortfolioMode } from '@/lib/portfolio-access/session';

type SeoOptions = { audioUrl?: string; musicProfileUrl?: string };

/** Add real music assets/profile URLs when approved; no unreleased audio is invented. */
export function SeoConfig(slug?: PillarSlug, options: SeoOptions = {}): Metadata {
  // Keep inherited gate/private metadata; no future-content tags on either gate.
  if (isPublicGateEnabled() || isPortfolioMode()) return {};
  const entry = slug ? getPillar(slug) : undefined;
  const title = entry ? `${entry.name} — Jesse Gawlik` : 'Jesse Gawlik — Whole Body Architect';
  const description = entry?.summary ?? 'The center is you. Five bodies. One living system. Begin where you’re being called.';
  const canonical = `https://jessegawlik.com${entry?.cta.href ?? '/'}`;
  const music = slug === 'music';
  return {
    title, description,
    keywords: entry ? [...entry.seoKeywords] : ['Whole Body Architect', 'Product Designer', 'Systems Architect', 'Whole Body'],
    alternates: { canonical },
    openGraph: { title, description, type: 'website', url: canonical, ...(music && options.audioUrl ? { audio: [{ url: options.audioUrl }] } : {}) },
    other: {
      ...(entry ? { 'wholebody:pillar': entry.pillar } : {}),
      ...(music && options.musicProfileUrl ? { 'music:musician': options.musicProfileUrl } : {}),
    },
  };
}

export const architectStructuredData = {
  '@context': 'https://schema.org', '@type': 'Person', name: 'Jesse Gawlik',
  url: 'https://jessegawlik.com', jobTitle: 'Product Designer',
  worksFor: { '@type': 'Organization', name: 'American Express' },
};
