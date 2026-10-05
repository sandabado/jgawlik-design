import type { Metadata } from 'next';
import Link from 'next/link';
import Mark from '@/components/Mark';
import NavigationShell from '@/components/NavigationShell';
import { requirePortfolioSession } from '@/lib/portfolio-access/server';
import styles from './portfolio.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Jesse Gawlik — Private Portfolio',
  description: 'A professional portfolio in progress, shared privately for review.',
  keywords: [],
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    title: 'Jesse Gawlik — Private Portfolio',
    description: 'A professional portfolio in progress, shared privately for review.',
    type: 'website',
    url: 'https://portfolio.jessegawlik.com',
  },
};

export default async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  await requirePortfolioSession();

  return (
    <main className={styles.shell}>
      <a className={styles.skipLink} href="#portfolio-content">Skip to content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/portfolio" prefetch={false}>
          <Mark className={styles.mark} />
          <span>Jesse Gawlik</span>
        </Link>
        <NavigationShell mode="linear" visualMode="professional" />
      </header>
      <div className={styles.content} id="portfolio-content" tabIndex={-1}>
        {children}
      </div>
      <footer className={styles.footer}>
        <span>Private review · Work in progress</span>
        <a href="mailto:jesse.gawlik@gmail.com">Get in touch ↗</a>
      </footer>
    </main>
  );
}
