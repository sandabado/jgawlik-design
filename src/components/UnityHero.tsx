import Quincunx from '@/components/Quincunx';
import gateStyles from '@/app/coming-soon/coming-soon.module.css';
import styles from './UnityCenter.module.css';

export default function UnityHero() {
  return (
    <section className={styles.hero} aria-labelledby="unity-title">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>The Whole Body Architect</p>
        <h1 id="unity-title">I build things<br />that <em>hold.</em></h1>
        <p className={styles.heroLede}>
          For fourteen years, I built trust inside the world’s largest institutions. I learned that systems only work when they respect the human inside them.
          <br /><br />
          Now I build for humans first.
          <br /><br />
          Music taught me that everything is vibration. The desert taught me that silence is information. My circles taught me that people don’t need fixing — they need space to remember what they already know.
          <br /><br />
          This is the same work, just at a different scale.
        </p>
        <a className={styles.enterLink} href="#unity-field">Enter the field <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.fieldRegion} id="unity-field" tabIndex={-1}>
        <div className={`${gateStyles.field} ${styles.ambientField}`} aria-hidden="true" />
        <div className={styles.fieldHeading}><span className={styles.kicker}>01 / THE UNITY CENTER</span><h2>Five bodies. One practice.<br />Where does your hand want to go?</h2></div>
        <Quincunx />
        <p className={styles.mapNote}>The map is not the territory. But it knows the way in.</p>
      </div>
    </section>
  );
}
