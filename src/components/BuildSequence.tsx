'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import BuildGlyph from './BuildGlyph';
import { BUILD_SEQUENCE } from '@/lib/build-sequence';

export default function BuildSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.45 });
  const driftY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.45 });
  const active = BUILD_SEQUENCE[activeIndex];

  useEffect(() => {
    if (reducedMotion || isPaused) return undefined;
    const cycle = window.setInterval(() => setActiveIndex((index) => (index + 1) % BUILD_SEQUENCE.length), 2400);
    return () => window.clearInterval(cycle);
  }, [isPaused, reducedMotion]);

  return (
    <aside
      className="build-sequence"
      aria-label="Interactive build sequence"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => { setIsPaused(false); pointerX.set(0); pointerY.set(0); }}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false); }}
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      }}
    >
      <div className="build-sequence__header">
        <span>BUILD SEQUENCE</span>
        <b>{String(activeIndex + 1).padStart(2, '0')} / {String(BUILD_SEQUENCE.length).padStart(2, '0')}</b>
      </div>
      <motion.div className="build-sequence__visual" style={reducedMotion ? undefined : { x: driftX, y: driftY }}>
        <BuildGlyph stageIndex={activeIndex} />
        <span className="build-sequence__axis build-sequence__axis--x" />
        <span className="build-sequence__axis build-sequence__axis--y" />
        <p className="build-sequence__caption">{active.shape.toUpperCase()} / {String(active.count).padStart(2, '0')}</p>
      </motion.div>
      <div className="build-sequence__readout" aria-live="polite">
        <div>
          <strong>{active.label}</strong>
          <p>{active.detail}</p>
        </div>
        <span>{active.count}</span>
      </div>
      <div className="build-sequence__controls">
        {BUILD_SEQUENCE.map((stage, index) => (
          <button
            type="button"
            key={stage.count}
            className={index === activeIndex ? 'is-active' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span>{String(stage.count).padStart(2, '0')}</span>
            <i />
            <b>{stage.label}</b>
          </button>
        ))}
      </div>
      <p className="build-sequence__hint">HOVER TO HOLD · SELECT A PHASE</p>
    </aside>
  );
}
