'use client';

import { motion } from 'framer-motion';
import { capabilities } from '@/lib/data/capabilities';
import Glyph from './Glyph';

export default function Capabilities() {
  const titles = ['DESIGN THINKING', 'TECHNICAL EXECUTION', 'AI / AGENTIC'];
  return <section className="site-section capabilities-section" id="capabilities"><header className="section-heading"><p className="section-kicker">CAPABILITIES</p><h2>Design thinking. Technical execution.<br /><em>Agentic intelligence.</em></h2></header><div className="capability-grid">{capabilities.map((capability, index) => <motion.article key={capability.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: index * 0.2 }}><Glyph name={capability.glyph} /><p>{capability.category}</p><h3>{titles[index]}</h3><i /> <ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul></motion.article>)}</div></section>;
}
