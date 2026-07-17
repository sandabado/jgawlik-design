'use client';

import { motion } from 'framer-motion';

export default function WaxStamp() {
  return (
    <motion.div className="wax-stamp" initial={{ rotate: -10, scale: 0.85, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true">
      <div className="wax-stamp__inner"><span>JG</span></div>
      <i />
    </motion.div>
  );
}
