import type { Metadata } from 'next';
import Mark from '@/components/Mark';
import styles from './coming-soon.module.css';

export const metadata: Metadata = {
  title: 'Jesse Gawlik — Coming Soon',
  description: 'We are gathering the fire. The field is quiet, preparing for the next turn.',
  keywords: [],
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Jesse Gawlik — Coming Soon',
    description: 'We are gathering the fire. The field is quiet, preparing for the next turn.',
    type: 'website',
  },
};

export default function ComingSoonPage() {
  return (
    <main className={styles.page}>
      <div className={styles.field} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.identity} aria-label="Jesse Gawlik">
          <Mark className={styles.mark} />
          <span>JG<span className={styles.plus}>+</span></span>
        </div>
      </header>
      <section className={styles.content} aria-labelledby="coming-soon-title">
        <h1 id="coming-soon-title">The System <span>is Being Rebuilt.</span></h1>
        <p className={styles.description}>We are gathering the fire. The field is quiet, preparing for the next turn.</p>
      </section>
      <footer className={styles.footer}>Return when the signal is clear.</footer>
    </main>
  );
}
