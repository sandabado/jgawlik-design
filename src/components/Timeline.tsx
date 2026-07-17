'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data/timeline';
import Glyph from './Glyph';

export default function Timeline() {
  return <section className="site-section timeline-section" id="timeline"><header className="section-heading"><p className="section-kicker">TRAJECTORY</p><h2>Systems thinking,<br /><em>compounded.</em></h2></header><div className="timeline"><motion.i className="timeline__line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} />{timeline.map((entry, index) => <motion.article className="timeline__entry" key={entry.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: index * 0.06 }}><Glyph name={entry.shape} /><p>{entry.year}</p><h3>{entry.role}</h3><small>{entry.company}</small><span>{entry.description}</span></motion.article>)}</div></section>;
}
