'use client';

import { motion } from 'framer-motion';
import Dodecahedron from './Dodecahedron';
import Glyph from './Glyph';

const pillars = ['triangle', 'octahedron', 'hexagon', 'square', 'dodecahedron'] as const;
const houses = ['triangle', 'square', 'pentagon', 'hexagon', 'octahedron', 'dodecahedron'] as const;

export default function BrandSystemGrid() {
  return (
    <section className="site-section brand-section" id="brand-systems"><header className="section-heading"><p className="section-kicker">BRAND SYSTEMS</p><h2>One ecosystem. Five pillars.<br /><em>Infinite scale.</em></h2></header>
      <div className="brand-grid">
        <motion.article className="brand-tile brand-tile--pillars" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div>{pillars.map((name) => <Glyph key={name} name={name} />)}</div><span>FIVE PILLARS</span></motion.article>
        <motion.article className="brand-tile brand-tile--houses" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}><div>{Array.from({ length: 12 }, (_, index) => <Glyph key={index} name={houses[index % houses.length]} />)}</div><span>TWELVE HOUSES</span></motion.article>
        <motion.article className="brand-tile brand-tile--platform" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}><p>WHOLEBODY<br /><b>EARTH</b></p><Dodecahedron /><span>PLATFORM ARCHITECTURE</span></motion.article>
        <motion.article className="brand-tile brand-tile--swatches" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}><div><i /><i /><i /><i /><i /></div><span>ELEMENTAL PALETTE</span></motion.article>
        <motion.article className="brand-tile brand-tile--records" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.32 }}><div><b>S</b><i /><i /></div><span>SANDABADO / WHOLE BODY RECORDS</span></motion.article>
      </div>
    </section>
  );
}
