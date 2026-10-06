import 'server-only';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPillar, type PillarSlug } from '@/lib/data/pillars';
import { requirePublicAccess } from '@/lib/gating/server';
import { isSomaticSpecimenEnabled } from '@/lib/design-system/somatic-access';
import { somaticRoomVariables, somaticTokens, somaticVariables } from '@/lib/design-system/somatic-tokens';
import { LivingSpecimen } from '@/components/somatic/LivingSpecimen';
import material from '@/components/somatic/SomaticMaterials.module.css';
import styles from './SomaticSpecimen.module.css';

export function generateMetadata(): Metadata {
  if (!isSomaticSpecimenEnabled()) notFound();
  return {
    title: 'Somatic — The Living Specimen',
    description: 'Private development review of material, motion, and room temperatures.',
    robots: { index: false, follow: false, noarchive: true },
    openGraph: { title: 'Somatic — The Living Specimen', description: 'Private development review.' },
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

const threads = [
  'M174 190 C260 130 370 80 468 120',
  'M468 120 C510 180 454 270 486 340',
  'M486 340 C360 385 272 375 144 410',
  'M144 410 C105 485 214 540 198 630',
  'M198 630 C294 610 395 580 474 558',
];

export default async function SomaticSpecimen() {
  if (!isSomaticSpecimenEnabled()) notFound();
  await requirePublicAccess();

  return (
    <LivingSpecimen style={somaticVariables()} rooms={rooms.map((room) => ({ slug: room.slug, name: getPillar(room.slug).name, style: somaticRoomVariables(room.slug) }))}>
      <a className={styles.skip} href="#rooms">Skip to the six rooms</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Jesse Gawlik <span>The Whole Body Architect</span></Link>
        <span className={styles.caption}>Somatic / living specimen 1.5</span>
      </header>

      <section className={styles.hero} aria-labelledby="specimen-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Desert mysticism × industrial craft</p>
          <h1 id="specimen-title">The night<br />has <em>rooms.</em></h1>
          <p className={styles.heroNote}>One practice. Many materials.<br />Light from within.</p>
          <a className={styles.textLink} href="#rooms" data-walk-start>Walk the rooms <span aria-hidden="true">↘</span></a>
          <a className={styles.breathControl} href="#rooms" data-walk-start aria-label="Begin room walk with the breathing clover">
            <svg className={styles.clover} viewBox="0 0 160 200" aria-hidden="true">
              <g className={styles.cloverBreath}>
                <g transform="translate(80 74)">
                  {[0, 90, 180, 270].map((rotation) => <path key={rotation} className={styles.cloverLeaf} transform={`rotate(${rotation})`} d="M0 0 C-9-11-30-20-28-39 C-26-56-3-60 0-43 C3-60 26-56 28-39 C30-20 9-11 0 0Z" />)}
                </g>
                <path className={styles.cloverStem} d="M80 74 C74 112 86 142 80 184" />
                <circle className={styles.cloverPoint} cx="80" cy="187" r="3" />
              </g>
            </svg>
            <span className={styles.breathCaption}>4+1 / breathing study</span>
          </a>
        </div>
        <nav className={styles.glassStudy} aria-label="Room temperature studies">
          <svg className={styles.filaments} viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true">
            {threads.map((path, index) => <g key={path}>
              <path className={styles.thread} d={path} pathLength="100" />
              <path className={styles.current} d={path} pathLength="100" style={{ animationDelay: `${index * -1.6}s` }} />
            </g>)}
          </svg>
          {rooms.map((room) => (
            <span key={room.slug} className={styles.paneFrame} data-room={room.slug} style={somaticRoomVariables(room.slug)}>
              <span className={styles.paneBloom} aria-hidden="true" />
              <a href={`#study-${room.slug}`} className={styles.glassPane} data-attention-room={room.slug}>
                <span className={styles.paneNumeral}>{room.numeral}</span>
                <span className={styles.paneName}>{room.element}</span>
                <span className={styles.paneCaption}>{getPillar(room.slug).name}</span>
              </a>
            </span>
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
            <article key={room.slug} id={`study-${room.slug}`} data-study-room={room.slug} data-attention-room={room.slug} data-room-name={pillar.name} tabIndex={0} aria-labelledby={`study-title-${room.slug}`} style={somaticRoomVariables(room.slug)} className={`${styles.room} ${material.lead} ${material.rim} ${room.slug === 'manuals' ? material.paper : ''}`}>
              <span className={styles.roomBloom} aria-hidden="true" />
              <div className={styles.roomTop}><span className={styles.numeral}>{room.numeral}</span><span className={styles.caption}>{room.element} / {room.temperature}</span></div>
              <h3 id={`study-title-${room.slug}`}>{pillar.name}</h3>
              <p className={styles.roomTitle}>{pillar.title}</p>
              <p className={styles.status}>{pillar.statusLabel}</p>
              <p className={styles.roomSummary}>{pillar.summary}</p>
              <div className={styles.swatches} aria-label={`${pillar.name} color values`}>
                {(['field', 'surface', 'accent', 'secondary'] as const).map((role) => (
                  <span key={role}><i aria-hidden="true" style={{ backgroundColor: palette[role].value }} />{role}<b>{palette[role].value}</b></span>
                ))}
              </div>
              <Link className={styles.textLink} href={pillar.cta.href}>{pillar.cta.label} <span aria-hidden="true">↗</span></Link>
              {room.slug !== 'guardian' && <svg className={styles.roomFilament} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className={styles.thread} d="M30 0 C30 40 70 60 70 100" pathLength="100" />
                <path className={styles.current} d="M30 0 C30 40 70 60 70 100" pathLength="100" />
              </svg>}
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
          <p>This study retains Playfair Display and DM Sans for the living-behavior review. If unavailable, the displayed fallbacks are Georgia and Arial. Cormorant + Source Sans 3 is provisionally approved; adoption awaits the final live review.</p>
          <p className={styles.caption}>Display 64–160px / body 16–18px / captions 12px<br />Procedural grain 3% / paper tooth 2.5% / gold seams 1px</p>
        </div>
        <ol className={styles.fontChoices}>
          <li><span className={styles.numeral}>01</span><div><h3>Cormorant + Source Sans 3</h3><p>Manuscript character. Humanist clarity. Provisionally approved.</p><a className={styles.textLink} href="https://fonts.google.com/specimen/Cormorant" target="_blank" rel="noreferrer">View Cormorant specimen ↗</a><a className={styles.textLink} href="https://adobe-fonts.github.io/source-sans/" target="_blank" rel="noreferrer">View Source Sans 3 specimen ↗</a></div></li>
          <li><span className={styles.numeral}>02</span><div><h3>Bodoni Moda + Lato</h3><p>Sharper editorial cuts. A warmer reading voice.</p><a className={styles.textLink} href="https://fonts.google.com/specimen/Bodoni+Moda" target="_blank" rel="noreferrer">View Bodoni Moda specimen ↗</a><a className={styles.textLink} href="https://www.latofonts.com/lato-free-fonts/" target="_blank" rel="noreferrer">View Lato specimen ↗</a></div></li>
          <li><span className={styles.numeral}>03</span><div><h3>Domaine Display + Source Sans 3</h3><p>Crafted editorial tension. Paid web license required for Domaine.</p><a className={styles.textLink} href="https://klim.co.nz/fonts/domaine-display/" target="_blank" rel="noreferrer">View Domaine specimen ↗</a></div></li>
        </ol>
      </section>

      <footer className={styles.footer}><p>The field is quiet. The fire is gathering.</p><Link className={styles.textLink} href="/">Return to the Unity Center ↗</Link><span className={styles.caption}>Stage 1.5 / feel before adoption / owner review pending</span></footer>
    </LivingSpecimen>
  );
}
