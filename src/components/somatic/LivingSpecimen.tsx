'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from '@/app/somatic-specimen/SomaticSpecimen.module.css';

type RoomTemperature = { slug: string; name: string; style: CSSProperties };

const GLIDE_MS = 2800;
const SETTLE_MS = 650;

/** Enhancement is confined to the guarded specimen; the complete content stays SSR. */
export function LivingSpecimen({ children, style, rooms }: {
  children: ReactNode;
  style: CSSProperties;
  rooms: readonly RoomTemperature[];
}) {
  const root = useRef<HTMLElement>(null);
  const stopButton = useRef<HTMLButtonElement>(null);
  const cancelWalk = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [stillness, setStillness] = useState(false);
  const [walking, setWalking] = useState(false);
  const [walkRoom, setWalkRoom] = useState('');
  const reduced = systemReduced || stillness;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    setReady(true);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (walking) stopButton.current?.focus({ preventScroll: true });
  }, [walking]);

  useEffect(() => {
    const main = root.current;
    if (!main) return;
    const chambers = Array.from(main.querySelectorAll<HTMLElement>('[data-study-room]'));
    let scrollFrame = 0;
    let glideFrame = 0;
    let settleTimer = 0;
    let walkGeneration = 0;
    let inWalk = false;
    let pointerRoom: HTMLElement | null = null;
    let focusRoom: HTMLElement | null = null;
    let passingRoom = rooms[0]?.slug ?? 'music';

    const activeRoom = () => {
      const attention = inWalk ? null : focusRoom ?? pointerRoom;
      main.dataset.activeRoom = attention?.dataset.attentionRoom ?? passingRoom;
    };

    const updateField = () => {
      scrollFrame = 0;
      // Pick the chamber at the visitor's eye-line, not whichever edge intersects first.
      const eyeLine = window.innerHeight * 0.44;
      const visible = chambers.filter((chamber) => {
        const bounds = chamber.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
      });
      if (visible.length) {
        const nearest = visible.reduce((best, chamber) => {
          const distance = (element: HTMLElement) => {
            const bounds = element.getBoundingClientRect();
            return eyeLine < bounds.top ? bounds.top - eyeLine : eyeLine > bounds.bottom ? eyeLine - bounds.bottom : 0;
          };
          return distance(chamber) < distance(best) ? chamber : best;
        });
        passingRoom = nearest.dataset.studyRoom ?? passingRoom;
      }
      activeRoom();
      main.style.setProperty('--somatic-grain-shift', reduced ? '0px' : `${Math.min(60, window.scrollY * 0.008).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateField);
    };

    const halt = () => {
      ++walkGeneration;
      inWalk = false;
      window.cancelAnimationFrame(glideFrame);
      window.clearTimeout(settleTimer);
      main.dataset.walking = 'false';
      // Keep keyboard position when the focused tour control is removed.
      if (document.activeElement === stopButton.current) {
        const current = chambers.find((chamber) => chamber.dataset.studyRoom === passingRoom) ?? chambers[0];
        current?.focus({ preventScroll: true });
      }
      setWalking(false);
    };
    cancelWalk.current = halt;

    const arrived = (chamber: HTMLElement) => {
      passingRoom = chamber.dataset.studyRoom ?? passingRoom;
      activeRoom();
      setWalkRoom(chamber.dataset.roomName ?? passingRoom);
    };

    const visit = (index: number, generation: number) => {
      if (generation !== walkGeneration || !chambers[index]) return;
      const chamber = chambers[index];
      const from = window.scrollY;
      const to = Math.min(document.documentElement.scrollHeight - window.innerHeight,
        Math.max(0, from + chamber.getBoundingClientRect().top - 48));
      const began = performance.now();
      setWalkRoom(chamber.dataset.roomName ?? '');
      const frame = (now: number) => {
        if (generation !== walkGeneration) return;
        const progress = Math.min(1, (now - began) / GLIDE_MS);
        // Smooth acceleration/deceleration; zero bounce and no CSS smooth-scroll double easing.
        const ease = progress * progress * (3 - 2 * progress);
        window.scrollTo({ top: from + (to - from) * ease, behavior: 'instant' });
        if (progress < 1) glideFrame = window.requestAnimationFrame(frame);
        else {
          arrived(chamber);
          if (index + 1 < chambers.length) settleTimer = window.setTimeout(() => visit(index + 1, generation), SETTLE_MS);
          else {
            halt();
            chamber.focus({ preventScroll: true });
          }
        }
      };
      glideFrame = window.requestAnimationFrame(frame);
    };

    const walk = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('[data-walk-start]');
      if (!link || !main.contains(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        if (inWalk && (event.target as Element).closest('a[href]')) halt();
        return;
      }
      event.preventDefault();
      halt();
      focusRoom = null;
      pointerRoom = null;
      if (reduced) {
        const first = chambers[0];
        if (first) {
          window.scrollTo({ top: Math.max(0, window.scrollY + first.getBoundingClientRect().top - 48), behavior: 'instant' });
          first.focus({ preventScroll: true });
          arrived(first);
        }
        return;
      }
      inWalk = true;
      main.dataset.walking = 'true';
      setWalking(true);
      visit(0, walkGeneration);
    };

    const pointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointerRoom = (event.target as Element).closest<HTMLElement>('[data-attention-room]');
      if (!inWalk) activeRoom();
    };
    const pointerOut = (event: PointerEvent) => {
      const next = event.relatedTarget instanceof Element
        ? event.relatedTarget.closest<HTMLElement>('[data-attention-room]') : null;
      pointerRoom = next;
      if (!inWalk) activeRoom();
    };
    const focusIn = (event: FocusEvent) => {
      focusRoom = (event.target as Element).closest<HTMLElement>('[data-attention-room]');
      if (!inWalk) activeRoom();
    };
    const focusOut = (event: FocusEvent) => {
      focusRoom = event.relatedTarget instanceof Element
        ? event.relatedTarget.closest<HTMLElement>('[data-attention-room]') : null;
      if (!inWalk) activeRoom();
    };
    const manualScroll = () => { if (inWalk) halt(); };
    const keyDown = (event: KeyboardEvent) => {
      if (!inWalk || !['Escape', 'Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return;
      halt();
      if (event.key === 'Escape') {
        const current = chambers.find((chamber) => chamber.dataset.studyRoom === passingRoom) ?? chambers[0];
        current?.focus({ preventScroll: true });
      }
    };

    updateField();
    main.addEventListener('click', walk);
    main.addEventListener('pointerover', pointerOver);
    main.addEventListener('pointerout', pointerOut);
    main.addEventListener('focusin', focusIn);
    main.addEventListener('focusout', focusOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', manualScroll, { passive: true });
    window.addEventListener('touchstart', manualScroll, { passive: true });
    window.addEventListener('keydown', keyDown);
    return () => {
      halt();
      window.cancelAnimationFrame(scrollFrame);
      main.removeEventListener('click', walk);
      main.removeEventListener('pointerover', pointerOver);
      main.removeEventListener('pointerout', pointerOut);
      main.removeEventListener('focusin', focusIn);
      main.removeEventListener('focusout', focusOut);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', manualScroll);
      window.removeEventListener('touchstart', manualScroll);
      window.removeEventListener('keydown', keyDown);
      cancelWalk.current = () => {};
    };
  }, [reduced, rooms]);

  return (
    <main ref={root} className={styles.specimen} style={style} data-living-ready={ready} data-reduced-motion={reduced}>
      <div className={styles.field} aria-hidden="true">
        {rooms.map((room) => <span key={room.slug} className={styles.temperatureLayer} data-field-room={room.slug} style={room.style} />)}
      </div>
      <div className={styles.livingGrain} data-living-grain aria-hidden="true" />
      {children}
      <div className={styles.motionControls}>
        <label className={styles.motionToggle}>
          <input id="somatic-stillness" type="checkbox" aria-label="Stillness" checked={reduced} disabled={systemReduced}
            onChange={(event) => { cancelWalk.current(); setStillness(event.target.checked); }} />
          <span>{systemReduced ? 'Reduced motion' : 'Stillness'}</span>
        </label>
        {walking && <div className={styles.walkControls}>
          <span className={styles.walkStatus} role="status">Walking / {walkRoom}</span>
          <button ref={stopButton} type="button" className={styles.stopWalk} onClick={() => cancelWalk.current()}>Stop walk</button>
        </div>}
      </div>
    </main>
  );
}
