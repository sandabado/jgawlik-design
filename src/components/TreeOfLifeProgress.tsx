'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'top', label: 'Origin' },
  { id: 'work', label: 'Systems' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'brand-systems', label: 'Identity' },
  { id: 'published', label: 'Records' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];

export default function TreeOfLifeProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex((section) => section.id === entry.target.id);
          if (index >= 0) setActive(index);
        }
      }),
      { rootMargin: '-40% 0px -45% 0px' },
    );
    sections.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  return <nav className="tree-of-life" aria-label="Mystic page progress">{sections.map((section, index) => {
    const state = index === active ? 'is-active' : index < active ? 'is-complete' : '';
    return <div className="tree-of-life__step" key={section.id}><button type="button" className={state} data-label={section.label} aria-label={`Go to ${section.label}`} aria-current={index === active ? 'step' : undefined} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}><i aria-hidden="true" /></button>{index < sections.length - 1 && <b aria-hidden="true" />}</div>;
  })}</nav>;
}
