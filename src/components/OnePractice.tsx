import styles from './UnityCenter.module.css';

export default function OnePractice() {
  return (
    <section className={styles.bio} aria-labelledby="practice-title">
      <div><p className={styles.kicker}>02 / ONE PRACTICE</p><h2 id="practice-title">One Practice, Many Materials</h2></div>
      <div className={styles.bioCopy}>
        <p>People ask how I can be a designer, a musician, a guide, a builder. They think these are different jobs.</p>
        <p>They’re not.</p>
        <p>Design is how I shape trust. Music is how I tune the vibration. Guiding is how I hold the space. Building is how I make it real.</p>
        <p className={styles.bioStatement}>Same hands. Different clay.</p>
        <p>At American Express, I stress-test systems so people can trust them. In the desert, I learn what actually grows. In the circles, I watch strangers become family. On the album, I capture the frequency that connects us.</p>
        <p>It’s all the same architecture. Just scaled differently.</p>
      </div>
    </section>
  );
}
