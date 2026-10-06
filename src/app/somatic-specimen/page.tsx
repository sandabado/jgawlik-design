import 'server-only';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPillar, type PillarSlug } from '@/lib/data/pillars';
import { requirePublicAccess } from '@/lib/gating/server';
import { isSomaticSpecimenEnabled } from '@/lib/design-system/somatic-access';
import { somaticRoomVariables, somaticTokens, somaticVariables } from '@/lib/design-system/somatic-tokens';
import material from '@/components/somatic/SomaticMaterials.module.css';
import styles from './SomaticSpecimen.module.css';

export function generateMetadata(): Metadata {
  if (!isSomaticSpecimenEnabled()) notFound();
  return {
    title: 'Somatic — Stage 1 material study',
    description: 'Private development review of typography, room temperatures, and material.',
    robots: { index: false, follow: false, noarchive: true },
    openGraph: { title: 'Somatic — Stage 1 material study', description: 'Private development review.' },
  };
}

const rooms: { slug: PillarSlug; element: string; temperature: string; numeral: string }[] = [
  { slug: 'music', element: 'Water', temperature: 'cool · liquid · resonant', numeral: '01' },
  { slug: 'foundation', element: 'Earth', temperature: 'ochre · bone · dusk', numeral: '02' },
  { slug: 'community', element: 'Fire', temperature: 'ember · rose gold · gathering', numeral: '03' },
  { slug: 'manuals', element: 'Air', temperature: 'silver · violet · spacious', numeral: '04' },
  { slug: 'design', element: 'The Hand', temperature: 'steel · precision · discipline', numeral: '05' },
  { slug: 'guardian', element: 'Ether', temperature: 'violet · gold · boundary', numeral: '06' },
];

export default async function SomaticSpecimen() {
  if (!isSomaticSpecimenEnabled()) notFound();
  await requirePublicAccess();

  return (
    <main className={`${styles.specimen} ${material.grain}`} style={somaticVariables()}>
      <a className={styles.skip} href="#rooms">Skip to the six rooms</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Jesse Gawlik <span>The Whole Body Architect</span></Link>
        <span className={styles.caption}>Somatic / material study 01</span>
      </header>

      <section className={styles.hero} aria-labelledby="specimen-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Desert mysticism × industrial craft</p>
          <h1 id="specimen-title">The night<br />has <em>rooms.</em></h1>
          <p className={styles.heroNote}>One practice. Many materials.<br />Light from within.</p>
          <a className={styles.textLink} href="#rooms">Walk the rooms <span aria-hidden="true">↘</span></a>
        </div>
        <nav className={styles.glassStudy} aria-label="Room temperature studies">
          <span className={styles.studyRule} aria-hidden="true" />
          {rooms.map((room) => (
            <a key={room.slug} href={`#study-${room.slug}`} className={styles.glassPane} data-room={room.slug} style={somaticRoomVariables(room.slug)}>
              <span className={styles.paneNumeral}>{room.numeral}</span>
              <span className={styles.paneName}>{room.element}</span>
              <span className={styles.paneCaption}>{getPillar(room.slug).name}</span>
            </a>
          ))}
          <p className={styles.studyCaption}>Six temperatures. One indigo field.</p>
        </nav>
        <div className={styles.heroMargin}><span>Gold / indigo / breath</span><span>Development study · owner review pending</span></div>
      </section>

      <section className={styles.rooms} id="rooms" aria-labelledby="rooms-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>01 / The six chambers</p>
          <h2 id="rooms-title">A house<br />at <em>night.</em></h2>
          <p>Each room holds its own temperature.<br />The darkness belongs to all of them.</p>
        </div>
        {rooms.map((room) => {
          const pillar = getPillar(room.slug);
          const palette = somaticTokens.rooms[room.slug];
          return (
            <article key={room.slug} id={`study-${room.slug}`} data-study-room={room.slug} style={somaticRoomVariables(room.slug)} className={`${styles.room} ${material.lead} ${material.rim} ${room.slug === 'manuals' ? material.paper : ''}`}>
              <div className={styles.roomTop}><span className={styles.numeral}>{room.numeral}</span><span className={styles.caption}>{room.element} / {room.temperature}</span></div>
              <h3>{pillar.name}</h3>
              <p className={styles.roomTitle}>{pillar.title}</p>
              <p className={styles.status}>{pillar.statusLabel}</p>
              <p className={styles.roomSummary}>{pillar.summary}</p>
              <div className={styles.swatches} aria-label={`${pillar.name} color values`}>
                {(['field', 'surface', 'accent', 'secondary'] as const).map((role) => (
                  <span key={role}><i aria-hidden="true" style={{ backgroundColor: palette[role].value }} />{role}<b>{palette[role].value}</b></span>
                ))}
              </div>
              <Link className={styles.textLink} href={pillar.cta.href}>{pillar.cta.label} <span aria-hidden="true">↗</span></Link>
            </article>
          );
        })}
      </section>

      <section className={`${styles.reading} ${material.paper} ${material.lead}`} aria-labelledby="reading-title">
        <p className={styles.eyebrow}>02 / Paper, breath, gold</p>
        <h2 id="reading-title">It’s all<br /><em>one hand.</em></h2>
        <div className={styles.readingCopy}>
          <p className={styles.readingLead}>Same hands. Different clay.</p>
          <p>At American Express, I stress-test systems so people can trust them. In the desert, I learn what actually grows. In the circles, I watch strangers become family. On the album, I capture the frequency that connects us.</p>
          <p className={styles.caption}>Approved copy / paper-tooth reading study</p>
        </div>
      </section>

      <section className={styles.typeStudy} aria-labelledby="type-title">
        <p className={styles.eyebrow}>03 / Two registers</p>
        <h2 id="type-title">Teeth.<br /><em>And breath.</em></h2>
        <div className={styles.typeNote}>
          <p>This study uses the existing Playfair Display and DM Sans. If unavailable, the displayed fallbacks are Georgia and Arial. The final pairing awaits your choice.</p>
          <p className={styles.caption}>Display 64–160px / body 16–18px / captions 12px<br />Procedural grain 3% / paper tooth 2.5% / gold seams 1px</p>
        </div>
        <ol className={styles.fontChoices}>
          <li><span className={styles.numeral}>01</span><div><h3>Cormorant + Source Sans 3</h3><p>Manuscript character. Humanist clarity. Recommended.</p><a className={styles.textLink} href="https://fonts.google.com/specimen/Cormorant" target="_blank" rel="noreferrer">View Cormorant specimen ↗</a><a className={styles.textLink} href="https://adobe-fonts.github.io/source-sans/" target="_blank" rel="noreferrer">View Source Sans 3 specimen ↗</a></div></li>
          <li><span className={styles.numeral}>02</span><div><h3>Bodoni Moda + Lato</h3><p>Sharper editorial cuts. A warmer reading voice.</p><a className={styles.textLink} href="https://fonts.google.com/specimen/Bodoni+Moda" target="_blank" rel="noreferrer">View Bodoni Moda specimen ↗</a><a className={styles.textLink} href="https://www.latofonts.com/lato-free-fonts/" target="_blank" rel="noreferrer">View Lato specimen ↗</a></div></li>
          <li><span className={styles.numeral}>03</span><div><h3>Domaine Display + Source Sans 3</h3><p>Crafted editorial tension. Paid web license required for Domaine.</p><a className={styles.textLink} href="https://klim.co.nz/fonts/domaine-display/" target="_blank" rel="noreferrer">View Domaine specimen ↗</a></div></li>
        </ol>
      </section>

      <footer className={styles.footer}><p>The field is quiet. The fire is gathering.</p><Link className={styles.textLink} href="/">Return to the Unity Center ↗</Link><span className={styles.caption}>Stage 1 / palettes, materials, scale / review before adoption</span></footer>
    </main>
  );
}
