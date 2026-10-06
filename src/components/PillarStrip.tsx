import Link from 'next/link';
import { pillars } from '@/lib/data/pillars';
import styles from './UnityCenter.module.css';

export default function PillarStrip() {
  return (
    <section className={styles.pillars} aria-labelledby="pillars-title">
      <header className={styles.sectionHeader}><p className={styles.kicker}>03 / SIX DOORS</p><h2 id="pillars-title">One living system.</h2></header>
      <div className={styles.pillarGrid}>
        {pillars.map((entry, index) => (
          <article className={styles.pillarCard} key={entry.slug} aria-labelledby={`pillar-${entry.slug}`}>
            <div className={styles.pillarTop}><span>{String(index + 1).padStart(2, '0')} / {entry.name}</span><span aria-hidden="true">{entry.glyph}</span></div>
            <h3 id={`pillar-${entry.slug}`}>{entry.title}</h3>
            <p>{entry.summary}</p>
            <span className={styles.status} data-status={entry.status}>{entry.statusLabel}</span>
            <Link className={styles.pillarLink} href={entry.cta.href} prefetch={false}>{entry.cta.label}<span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
