import Link from 'next/link';
import { requirePortfolioSession } from '@/lib/portfolio-access/server';
import styles from '../portfolio.module.css';

export default async function PortfolioAboutPage() {
  await requirePortfolioSession();

  return (
    <article>
      <Link className={styles.textLink} href="/portfolio" prefetch={false}>← Back to work</Link>
      <header className={styles.intro}>
        <p className={styles.kicker}>About / In progress</p>
        <h1>Jesse <span>Gawlik.</span></h1>
        <p className={styles.lede}>The professional profile is being reworked. An updated introduction, background, and approach will be added here.</p>
      </header>
      <section className={styles.placeholder} aria-labelledby="profile-title">
        <p className={styles.kicker}>Content pending</p>
        <h2 id="profile-title">Profile</h2>
        <p>This section is awaiting the new portfolio narrative.</p>
      </section>
      <section className={styles.aboutPreview} aria-labelledby="contact-title">
        <div><p className={styles.kicker}>Contact</p><h2 id="contact-title">Start a conversation.</h2></div>
        <a className={styles.textLink} href="mailto:jesse.gawlik@gmail.com">jesse.gawlik@gmail.com ↗</a>
      </section>
    </article>
  );
}
