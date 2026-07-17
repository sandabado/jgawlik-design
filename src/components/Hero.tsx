'use client';

import { motion } from 'framer-motion';
import BuildSequence from './BuildSequence';

const headline = ['AGENTIC', 'SYSTEMS', 'ARCHITECT'];
const enter = {
  hidden: { opacity: 0, y: 34, clipPath: 'inset(0 0 100% 0)' },
  show: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
};

export default function Hero() {
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero-v2" id="top">
      <div className="hero-v2__orb" aria-hidden="true" />
      <div className="hero-v2__status"><i /> Available for select engagements</div>
      <motion.div initial="hidden" animate="show" transition={{ delayChildren: 0.15, staggerChildren: 0.12 }} className="hero-v2__inner">
        <p className="section-kicker">JESSE GAWLIK // AGENTIC SYSTEMS ARCHITECT</p>
        <h1>{headline.map((word) => <motion.span key={word} variants={enter} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }} className={word === 'SYSTEMS' ? 'hero-v2__accent' : ''}>{word}</motion.span>)}</h1>
        <motion.p variants={enter} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }} className="hero-v2__description">I design and ship autonomous AI products — from user research to deployment.<br /><br /><em>Enterprise-grade design thinking. Full-stack execution. Agentic workflow architecture.</em></motion.p>
        <motion.div variants={enter} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }} className="hero-v2__cta"><button onClick={() => go('#work')}>VIEW WORK</button><button onClick={() => go('#contact')}>CONTACT</button></motion.div>
      </motion.div>
      <BuildSequence />
      <p className="hero-v2__scroll">↓ SCROLL</p>
    </section>
  );
}
