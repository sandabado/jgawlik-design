'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/constants';

const projectLinks = [
  ['American Express', '#amex-tetra-os'],
  ['ThermoFisher', '#thermo-component-systems'],
  ['Whole Body Earth', '#whole-body-five-arms'],
  ['Whole Body Studios', '#agentic-ai-architecture'],
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    setWorkOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navigation ${scrolled ? 'navigation--scrolled' : ''}`}>
      <button className="navigation__logo" onClick={() => go('#top')} aria-label="Return to the top">JG<span>+</span></button>
      <nav className="navigation__links" aria-label="Primary navigation">
        <div className="work-menu">
          <button onClick={() => setWorkOpen(!workOpen)} aria-expanded={workOpen}>Work <ChevronDown size={12} /></button>
          {workOpen && <div className="work-menu__panel">{projectLinks.map(([label, href]) => <button key={href} onClick={() => go(href)}>{label}</button>)}</div>}
        </div>
        {navItems.slice(1).map((item) => <button key={item.href} onClick={() => go(item.href)}>{item.label}</button>)}
      </nav>
      <div className="navigation__actions">
        <Link href="/resume" className="nav-resume">Resume ↗</Link>
        <button onClick={() => go('#contact')} className="nav-contact">Get in touch</button>
      </div>
      <button className="navigation__toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
      {mobileOpen && <nav className="mobile-panel" aria-label="Mobile navigation">{navItems.map((item) => <button key={item.href} onClick={() => go(item.href)}>{item.label}</button>)}<Link href="/resume">Resume ↗</Link></nav>}
    </header>
  );
}
