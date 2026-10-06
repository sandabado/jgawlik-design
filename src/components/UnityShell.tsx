'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useSyncExternalStore, type ReactNode } from 'react';
import Mark from '@/components/Mark';
import NavigationShell from '@/components/NavigationShell';
import type { NavigationMode, VisualMode } from '@/lib/types';
import styles from './UnityCenter.module.css';

const subscribe = () => () => {};

export default function UnityShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const [mode, setMode] = useState<NavigationMode>('linear');
  const [appearance, setAppearance] = useState<VisualMode | null>(null);
  const visualMode = appearance ?? (pathname === '/design' ? 'professional' : 'ethereal');
  return (
    <main className={styles.shell} data-visual-mode={visualMode}>
      <a className={styles.skipLink} href="#unity-content">Skip to content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" prefetch={false} aria-label="Jesse Gawlik — Unity Center"><Mark /><span>JG<span>+</span></span></Link>
        <NavigationShell scope="unity" mode={mode} visualMode={visualMode} showSignOut={false} />
        <div className={styles.shellControls} hidden={!ready}>
          <button type="button" onClick={() => setMode(mode === 'linear' ? 'radial' : 'linear')} aria-label={`Switch to ${mode === 'linear' ? 'radial' : 'linear'} navigation`}><span aria-hidden="true">{mode === 'linear' ? '⊙' : '≡'}</span><span className={styles.controlText}>{mode === 'linear' ? 'Map' : 'Linear'}</span></button>
          <button type="button" onClick={() => setAppearance(visualMode === 'ethereal' ? 'professional' : 'ethereal')} aria-label={`Switch to ${visualMode === 'ethereal' ? 'professional' : 'ethereal'} appearance`}><span aria-hidden="true">◐</span><span className={styles.controlText}>{visualMode === 'ethereal' ? 'Professional' : 'Ethereal'}</span></button>
        </div>
      </header>
      <div className={styles.content} id="unity-content" tabIndex={-1}>{children}</div>
      <footer className={styles.footer}>
        <p>The field is quiet. The fire is waiting.<br />Come when you’re ready.</p>
        <div><a href="mailto:jesse.gawlik@gmail.com">Contact ↗</a><Link href="/resume" prefetch={false}>Resume ↗</Link></div>
        <span>© 2026 Jesse Gawlik. Built from the center out.</span>
      </footer>
    </main>
  );
}
