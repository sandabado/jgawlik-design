'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import Quincunx from '@/components/Quincunx';
import { pillars } from '@/lib/data/pillars';
import type { NavigationMode, VisualMode } from '@/lib/types';
import styles from './UnityCenter.module.css';

export default function UnityNavigation({ mode, visualMode }: { mode: NavigationMode; visualMode: VisualMode }) {
  const pathname = usePathname();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  return (
    <nav className={styles.unityNavigation} data-navigation-mode={mode} data-visual-mode={visualMode} aria-label="Unity Center navigation">
      <ul className={styles.linearLinks}>
        <li><Link href="/" prefetch={false} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link></li>
        {pillars.map((entry) => <li key={entry.slug}><Link href={entry.cta.href} prefetch={false} aria-current={pathname === entry.cta.href ? 'page' : undefined}>{entry.name}</Link></li>)}
      </ul>
      {/* Native disclosure state can change before hydration; preserve that choice. */}
      <details className={styles.radialDisclosure} ref={disclosure} suppressHydrationWarning onKeyDown={(event) => {
        if (event.key === 'Escape' && disclosure.current?.open) { disclosure.current.open = false; summary.current?.focus(); }
      }}>
        <summary ref={summary} aria-label="Constellation navigation"><span aria-hidden="true">☉</span></summary>
        <div className={styles.radialPanel} onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest('a') && disclosure.current) disclosure.current.open = false;
        }}>
          <Link className={styles.radialHome} href="/" prefetch={false}>Unity Center <span aria-hidden="true">↗</span></Link>
          <p className={styles.kicker}>Which body is calling you?</p>
          <Quincunx compact />
        </div>
      </details>
    </nav>
  );
}
