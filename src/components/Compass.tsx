'use client';

import { useEffect, useState } from 'react';

const points = [
  { glyph: '🜃', id: 'work', label: 'Work · Earth' },
  { glyph: '☿', id: 'architecture', label: 'Architecture · Mercury' },
  { glyph: '🜔', id: 'brand-systems', label: 'Brand systems · Salt' },
  { glyph: '🜄', id: 'published', label: 'Published work · Water' },
  { glyph: '🜂', id: 'capabilities', label: 'Capabilities · Fire' },
  { glyph: '🜁', id: 'contact', label: 'Contact · Air' },
];

export default function Compass() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = points.findIndex((point) => point.id === entry.target.id);
          if (index >= 0) setActive(index);
        }
      }),
      { rootMargin: '-40% 0px -45% 0px' },
    );
    points.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  return <nav className="sacred-compass" aria-label="Alchemical section compass">{points.map((point, index) => <button className={active === index ? 'is-active' : ''} key={point.id} onClick={() => document.getElementById(point.id)?.scrollIntoView({ behavior: 'smooth' })} aria-label={point.label} data-label={point.label}><span aria-hidden="true">{point.glyph}</span></button>)}</nav>;
}
