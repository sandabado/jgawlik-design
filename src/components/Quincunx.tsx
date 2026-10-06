import Link from 'next/link';
import { compassDestinations, compassPillars, getPillar, type PillarSlug } from '@/lib/data/pillars';
import styles from './UnityCenter.module.css';

export default function Quincunx({ compact = false }: { compact?: boolean }) {
  const design = getPillar('design');
  return (
    <div className={styles.compass} data-compact={compact}>
      <div className={styles.compassGeometry} aria-hidden="true"><i /><i /><i /></div>
      <ul className={styles.compassPoints}>
        {compassPillars.map((entry) => (
          <li key={entry.slug} data-point={entry.pillar}>
            <Link href={entry.cta.href} prefetch={false}>
              <span className={styles.pointGlyph} aria-hidden="true">{entry.glyph}</span>
              <span className={styles.pointBody}>{entry.body} <span>· {entry.pillar}</span></span>
              <strong>{entry.prompt}</strong>
              <span className={styles.pointDoor}>{compassDestinations[entry.slug as PillarSlug]} <span aria-hidden="true">↗</span></span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className={styles.buildDoor} href={design.cta.href} prefetch={false}>
        <span aria-hidden="true">⚒️</span><strong>{design.prompt}</strong><span>{compassDestinations.design} ↗</span>
      </Link>
    </div>
  );
}
