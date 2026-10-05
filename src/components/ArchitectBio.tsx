import styles from './UnityCenter.module.css';

export default function ArchitectBio() {
  return (
    <section className={styles.bio} aria-labelledby="architect-title">
      <div><p className={styles.kicker}>03 / THE ARCHITECT</p><h2 id="architect-title">Jesse Gawlik</h2><p className={styles.bioTitle}>Whole Body Architect</p></div>
      <div className={styles.bioCopy}>
        <p>Principal product designer by training — fourteen years building systems that hold inside Fortune 100 environments. Architect by calling — the Whole Body ecosystem, running since 2025, is the same trust architecture at human scale: presence, creation, and sovereignty under one roof.</p>
        <p className={styles.bioStatement}>He doesn’t build tools that extract. He builds structures that hold.</p>
        <p className={styles.currentRole}>Currently: Senior Product Designer, American Express · building and stress-testing the Trust Harness · founder of Whole Body Earth</p>
      </div>
    </section>
  );
}
