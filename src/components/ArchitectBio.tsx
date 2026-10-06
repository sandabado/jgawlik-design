import styles from './UnityCenter.module.css';

export default function ArchitectBio() {
  return (
    <section className={styles.bio} aria-labelledby="architect-title">
      <div><p className={styles.kicker}>04 / THE ARCHITECT</p><h2 id="architect-title">Jesse Gawlik</h2><p className={styles.bioTitle}>The Whole Body Architect</p></div>
      <div className={styles.bioCopy}>
        <p>I spent my career learning how to build trust inside systems that forget people exist. Now I’m learning how to build systems that remember.</p>
        <p>Designer by trade. Musician by necessity. Guide by calling. Builder by nature.</p>
        <p>I don’t believe in separate lives. The music teaches the design. The desert teaches the circles. The circles teach the manuals. The manuals teach the guardian.</p>
        <p className={styles.bioStatement}>It’s all one hand.</p>
        <p className={styles.currentRole}>Currently: Senior Product Designer at American Express, building the Trust Harness. Founder of Whole Body Earth.</p>
        <p>Looking for: Partners who understand that trust isn’t a feature — it’s the foundation.</p>
      </div>
    </section>
  );
}
