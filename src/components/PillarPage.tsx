import Link from 'next/link';
import { getPillar, type PillarSlug } from '@/lib/data/pillars';
import styles from './UnityCenter.module.css';

export default function PillarPage({ slug }: { slug: PillarSlug }) {
  const entry = getPillar(slug);
  return (
    <section className={styles.stub} aria-labelledby={`page-${slug}`}>
      <span className={styles.stubGlyph} aria-hidden="true">{entry.glyph}</span>
      <p className={styles.kicker}>{entry.name} / {entry.title}</p>
      <h1 id={`page-${slug}`}>{entry.name}</h1>
      <p className={styles.status} data-status={entry.status}>{entry.statusLabel}</p>
      <Link className={styles.enterLink} href="/" prefetch={false}>Back to Unity Center <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
