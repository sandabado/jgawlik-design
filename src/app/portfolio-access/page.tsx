import type { Metadata } from 'next';
import Mark from '@/components/Mark';
import styles from './portfolio-access.module.css';
import { redirect } from 'next/navigation';
import { isPortfolioMode } from '@/lib/portfolio-access/session';

export const metadata: Metadata = {
  title: 'Jesse Gawlik — Portfolio Access',
  description: 'Private portfolio access.',
  keywords: [],
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Jesse Gawlik — Portfolio Access',
    description: 'Private portfolio access.',
    type: 'website',
  },
};

type AccessPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function PortfolioAccessPage({ searchParams }: AccessPageProps) {
  if (!isPortfolioMode()) redirect('/coming-soon');
  const hasError = Boolean((await searchParams).error);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.identity} aria-label="Jesse Gawlik">
          <Mark className={styles.mark} />
          <span>JG<span className={styles.plus}>+</span></span>
        </div>
      </header>
      <section className={styles.content} aria-labelledby="portfolio-access-title">
        <p className={styles.kicker}>PRIVATE PORTFOLIO</p>
        <h1 id="portfolio-access-title">Enter<br /><span>the portfolio.</span></h1>
        <p className={styles.description}>A work in progress, shared by invitation.</p>
        <form className={styles.form} action="/api/portfolio-access/login" method="post">
          <label htmlFor="portfolio-password">Password</label>
          <input
            id="portfolio-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={256}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? 'access-error' : undefined}
          />
          {hasError && <p id="access-error" className={styles.error} role="alert">Unable to grant access. Please try again.</p>}
          <button type="submit">Continue <span aria-hidden="true">↗</span></button>
        </form>
      </section>
      <footer className={styles.footer}>
        <a href="mailto:jesse.gawlik@gmail.com">Contact Jesse <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
