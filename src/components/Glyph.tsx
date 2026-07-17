import type { TimelineEntry } from '@/types';

type GlyphName = TimelineEntry['shape'] | 'octahedron';

const paths: Record<GlyphName, string> = {
  triangle: 'M50 10 L90 80 L10 80 Z',
  square: 'M10 10 L90 10 L90 90 L10 90 Z',
  pentagon: 'M50 5 L95 38 L78 90 L22 90 L5 38 Z',
  hexagon: 'M50 5 L90 27 L90 73 L50 95 L10 73 L10 27 Z',
  octahedron: 'M50 5 L90 50 L50 95 L10 50 Z M50 5 L50 95 M10 50 L90 50',
  decagon: 'M50 4 L76 12 L92 34 L92 66 L76 88 L50 96 L24 88 L8 66 L8 34 L24 12 Z',
  dodecahedron: 'M50 5 L82 28 L70 66 L30 66 L18 28 Z M30 66 L18 28 L5 50 L27 89 L50 95 L73 89 L95 50 L82 28 L70 66 M30 66 L50 95 M70 66 L50 95',
};

export default function Glyph({ name, className = '' }: { name: GlyphName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
