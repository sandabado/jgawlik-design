import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requirePortfolioSession } from '@/lib/portfolio-access/server';
import { caseStudies } from '../../case-studies';
import styles from '../../portfolio.module.css';

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

async function getCaseStudy(params: CaseStudyPageProps['params']) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return study;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  await requirePortfolioSession();
  const study = await getCaseStudy(params);

  return (
    <article>
      <Link className={styles.textLink} href="/portfolio" prefetch={false}>← Back to work</Link>
      <header className={styles.intro}>
        <p className={styles.kicker}>Selected work / {study.number}</p>
        <h1>{study.title}</h1>
        <p className={styles.lede}>This case study is in preparation. Project details and supporting work will be added here.</p>
      </header>
      <div className={styles.studySections}>
        {['Overview', 'Context', 'Approach', 'Outcome'].map((section, index) => (
          <section className={styles.placeholder} key={section} aria-labelledby={`study-section-${index}`}>
            <p className={styles.kicker}>0{index + 1} / Content pending</p>
            <h2 id={`study-section-${index}`}>{section}</h2>
            <p>{section === 'Outcome' ? '[METRIC — PENDING]' : 'This section is awaiting approved case-study content.'}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
