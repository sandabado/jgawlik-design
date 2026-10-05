import Quincunx from '@/components/Quincunx';
import gateStyles from '@/app/coming-soon/coming-soon.module.css';
import styles from './UnityCenter.module.css';

export default function UnityHero() {
  return (
    <section className={styles.hero} aria-labelledby="unity-title">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>JESSE GAWLIK // WHOLE BODY ARCHITECT</p>
        <h1 id="unity-title">The center<br />is <em>you.</em></h1>
        <p className={styles.heroLede}>Five bodies. One living system.<br />Begin where you’re being called.</p>
        <a className={styles.enterLink} href="#unity-field">Enter the field <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.fieldRegion} id="unity-field" tabIndex={-1}>
        <div className={`${gateStyles.field} ${styles.ambientField}`} aria-hidden="true" />
        <div className={styles.fieldHeading}><span className={styles.kicker}>01 / THE UNITY CENTER</span><h2>Which body is calling you?</h2></div>
        <Quincunx />
        <p className={styles.mapNote}>Five bodies. One whole. The map is not the territory — but it knows the way in.</p>
      </div>
    </section>
  );
}
