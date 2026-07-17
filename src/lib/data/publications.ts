import type { Publication } from '@/types';

export const publications: Publication[] = [
  { id: 'codex', title: 'The Living Earth Codex', subtitle: 'Five-volume operating system for sovereign creators', format: 'book', role: 'Author · Designer · Publisher', linkUrl: 'https://wholebody.earth', price: '$25–$297' },
  { id: 'sandabado', title: 'Sandabado', subtitle: 'Debut album · Soulful blues rock · Whole Body Records', format: 'album', role: 'Producer · Songwriter · Creative Director', linkUrl: 'https://sandabado.com', price: 'Vinyl $33 · Stream Free' },
  { id: 'living-earth-vol1', title: 'Living Earth: Volume 1', subtitle: 'Twelve tracks. Twelve houses. Twelve framers.', format: 'compilation', role: 'Executive Producer · Brand Designer', linkUrl: 'https://wholebody.earth', price: '$25 digital · $150 vinyl' },
];
