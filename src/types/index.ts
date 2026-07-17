export interface Project {
  id: string;
  index: string;
  title: string;
  company: string;
  role: string;
  period: string;
  category: 'enterprise' | 'founder' | 'ai';
  description: string;
  context: string;
  challenge: string;
  problem: string;
  approach: string;
  outcome: string;
  metric: string;
  artifacts: string[];
  visual: 'tetra' | 'components' | 'ecosystem' | 'agents';
  tags: string[];
  imageUrl?: string;
  linkUrl?: string;
  featured: boolean;
}

export interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  description: string;
  shape: 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'decagon' | 'dodecahedron';
}

export interface Capability {
  category: string;
  glyph: 'triangle' | 'square' | 'pentagon';
  items: string[];
}

export interface Publication {
  id: string;
  title: string;
  subtitle: string;
  format: 'book' | 'album' | 'compilation';
  role: string;
  coverImage?: string;
  linkUrl: string;
  price?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
