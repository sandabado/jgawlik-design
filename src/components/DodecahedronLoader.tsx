'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BuildGlyph from './BuildGlyph';
import { BUILD_SEQUENCE } from '@/lib/build-sequence';

export default function DodecahedronLoader() {
  const [dissolving, setDissolving] = useState(false);
  const [visible, setVisible] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const previousOverflow = useRef('');
  const stage = BUILD_SEQUENCE[stageIndex];

  const dismiss = () => {
    setDissolving(true);
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow.current;
    }, reducedMotion ? 0 : 360);
  };

  useEffect(() => {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const cadence = reducedMotion ? 0 : 610;
    const totalDuration = reducedMotion ? 900 : 5200;
    const advance = cadence
      ? window.setInterval(() => setStageIndex((index) => Math.min(index + 1, BUILD_SEQUENCE.length - 1)), cadence)
      : undefined;
    const dissolve = window.setTimeout(() => setDissolving(true), totalDuration - 520);
    const remove = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow.current;
    }, totalDuration);

    return () => {
      if (advance) window.clearInterval(advance);
      window.clearTimeout(dissolve);
      window.clearTimeout(remove);
      document.body.style.overflow = previousOverflow.current;
    };
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <motion.div
      className="loader-v2"
      animate={{ opacity: dissolving ? 0 : 1, scale: dissolving ? 1.035 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Building systems sequence"
    >
      <div className="loader-v2__status">
        <span>JG / SYSTEMS BOOT</span>
        <b>{String(stageIndex + 1).padStart(2, '0')} / {String(BUILD_SEQUENCE.length).padStart(2, '0')}</b>
      </div>
      <button type="button" className="loader-v2__skip" onClick={dismiss}>SKIP INTRO</button>
      <div className="loader-v2__geometry">
        <BuildGlyph stageIndex={stageIndex} compact />
      </div>
      <div className="loader-v2__readout" aria-live="polite">
        <motion.p key={stage.shape} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
          {String(stage.count).padStart(2, '0')} / {stage.shape.toUpperCase()}
        </motion.p>
        <strong>{stage.label}</strong>
        <span>{stage.detail}</span>
      </div>
      <div className="loader-v2__timeline" aria-hidden="true">
        {BUILD_SEQUENCE.map((item, index) => <i className={index <= stageIndex ? 'is-active' : ''} key={item.count} />)}
      </div>
    </motion.div>
  );
}
