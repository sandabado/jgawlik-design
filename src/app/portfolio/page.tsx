import Link from 'next/link';
import { requirePortfolioSession } from '@/lib/portfolio-access/server';
import { caseStudies } from './case-studies';
import styles from './portfolio.module.css';

export default async function PortfolioPage() {
  await requirePortfolioSession();

  return (
    <>
      <section className={styles.intro} aria-labelledby="portfolio-title">
        <p className={styles.kicker}>Private portfolio / In progress</p>
        <h1 id="portfolio-title">A new body<br />of <span>work.</span></h1>
        <p className={styles.lede}>This portfolio is being rebuilt. The case studies below are spaces for the work to come.</p>
      </section>

      <section className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHead}>
          <h2 id="work-title">Selected work</h2>
          <span>03 case studies / Content pending</span>
        </div>
        <div className={styles.cards}>
          {caseStudies.map((study) => (
            <Link className={styles.card} key={study.slug} href={`/portfolio/case-studies/${study.slug}`} prefetch={false}>
              <div className={styles.cardField} aria-hidden="true"><span>{study.number}</span></div>
              <p className={styles.kicker}>In preparation</p>
              <h3>{study.title}<span aria-hidden="true">↗</span></h3>
              <p>{study.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.aboutPreview} aria-labelledby="about-title">
        <div>
          <p className={styles.kicker}>About</p>
          <h2 id="about-title">Jesse Gawlik</h2>
        </div>
        <div>
          <p>The professional profile is being reworked alongside the portfolio.</p>
          <Link className={styles.textLink} href="/portfolio/about" prefetch={false}>About this portfolio ↗</Link>
        </div>
      </section>
    </>
  );
}
