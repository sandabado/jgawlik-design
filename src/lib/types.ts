export type Pillar = 'fire' | 'air' | 'earth' | 'water' | 'ether';
export type Status = 'active' | 'preview' | 'in-preparation' | 'hold' | 'development';
export type WorkType = 'design-case' | 'album' | 'manual' | 'event' | 'article';

export interface ContentItem {
  slug: string;
  title: string;
  pillar: Pillar;
  status: Status;
  summary: string;
  cta: { label: string; href: string };
  type?: WorkType;
}

export type VisualMode = 'professional' | 'ethereal';
export type NavigationMode = 'linear' | 'radial';
