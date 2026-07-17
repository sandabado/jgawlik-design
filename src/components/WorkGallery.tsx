'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/types';

type WorkGalleryProps = {
  projects: Project[];
};

type GalleryRoomProps = {
  project: Project;
  index: number;
  active: boolean;
  revealed: boolean;
  onActivate: (id: string) => void;
  onToggle: (id: string) => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

function TetraVisual() {
  const nodes = [
    { x: 230, y: 62, label: 'RESEARCH' },
    { x: 392, y: 162, label: 'WIRE' },
    { x: 330, y: 350, label: 'HANDOFF' },
    { x: 124, y: 350, label: 'QA' },
    { x: 68, y: 162, label: 'COPY' },
  ];

  return (
    <div className="gallery-visual gallery-visual--tetra" aria-hidden="true">
      <div className="gallery-visual__hud"><span>TETRA OS / DEPLOYED</span><b>AI + HUMAN</b></div>
      <svg viewBox="0 0 460 420">
        <defs>
          <radialGradient id="tetra-core" cx="50%" cy="48%" r="50%"><stop offset="0%" stopColor="#8d76ff" stopOpacity=".45" /><stop offset="100%" stopColor="#07060b" stopOpacity="0" /></radialGradient>
        </defs>
        <circle className="gallery-visual__field" cx="230" cy="210" r="168" />
        <circle className="gallery-visual__field gallery-visual__field--inner" cx="230" cy="210" r="112" />
        <circle cx="230" cy="210" r="166" fill="url(#tetra-core)" />
        <path className="gallery-visual__path" d="M230 62 392 162 330 350H124L68 162 230 62ZM68 162l162 48 162-48M230 210V62m0 148 100 140m-100-140L124 350" />
        {nodes.map((node, index) => <g className="gallery-visual__node" key={node.label} style={{ ['--node-delay' as string]: `${index * 110}ms` }}><circle cx={node.x} cy={node.y} r="5" /><text x={node.x} y={node.y - 15} textAnchor="middle">{node.label}</text></g>)}
        <circle className="gallery-visual__core" cx="230" cy="210" r="32" />
        <text className="gallery-visual__core-label" x="230" y="205" textAnchor="middle">TETRA</text>
        <text className="gallery-visual__core-label gallery-visual__core-label--small" x="230" y="220" textAnchor="middle">OS</text>
      </svg>
      <div className="gallery-visual__footer"><span>HUMAN REVIEW</span><i /><span>CONTEXTUAL OUTPUT</span></div>
    </div>
  );
}

function ComponentsVisual() {
  const cells = Array.from({ length: 24 }, (_, index) => index);
  return (
    <div className="gallery-visual gallery-visual--components" aria-hidden="true">
      <div className="gallery-visual__hud"><span>SCIENTIFIC COMMERCE</span><b>VARIANT MATRIX</b></div>
      <div className="component-matrix">
        <div className="component-matrix__side"><span>SPEC</span><i /><span>FILTER</span><i /><span>COMPARE</span><i /><span>ORDER</span></div>
        <div className="component-matrix__grid">{cells.map((cell) => <i className={cell === 3 || cell === 8 || cell === 17 || cell === 21 ? 'is-active' : ''} key={cell}><b>{String(cell + 1).padStart(2, '0')}</b></i>)}</div>
      </div>
      <div className="component-matrix__readout"><span>PERSONA / RESEARCHER</span><b>± 0.00</b><span>PERSONA / PROCUREMENT</span></div>
    </div>
  );
}

function EcosystemVisual() {
  const arms = [
    { label: 'GUARDIAN', angle: -90 },
    { label: 'FOUNDATION', angle: -18 },
    { label: 'STUDIOS', angle: 54 },
    { label: 'PRESENCE', angle: 126 },
    { label: 'PRESS', angle: 198 },
  ];
  return (
    <div className="gallery-visual gallery-visual--ecosystem" aria-hidden="true">
      <div className="gallery-visual__hud"><span>WHOLE BODY / 05 ARMS</span><b>UNIFIED PLATFORM</b></div>
      <svg viewBox="0 0 460 420">
        <circle className="gallery-visual__field" cx="230" cy="210" r="158" />
        <circle className="gallery-visual__field gallery-visual__field--inner" cx="230" cy="210" r="96" />
        {arms.map((arm, index) => {
          const radians = (arm.angle * Math.PI) / 180;
          const x = 230 + Math.cos(radians) * 142;
          const y = 210 + Math.sin(radians) * 142;
          const labelX = 230 + Math.cos(radians) * 180;
          const labelY = 210 + Math.sin(radians) * 180;
          return <g className="ecosystem-arm" key={arm.label} style={{ ['--arm-delay' as string]: `${index * 140}ms` }}><path d={`M230 210 L${x} ${y}`} /><circle cx={x} cy={y} r="12" /><circle cx={x} cy={y} r="5" /><text x={labelX} y={labelY + 4} textAnchor="middle">{arm.label}</text></g>;
        })}
        <polygon className="ecosystem-core" points="230,154 283,192 263,254 197,254 177,192" />
        <text className="gallery-visual__core-label" x="230" y="207" textAnchor="middle">ONE</text>
        <text className="gallery-visual__core-label gallery-visual__core-label--small" x="230" y="222" textAnchor="middle">PLATFORM</text>
      </svg>
      <div className="gallery-visual__footer"><span>SHARED AUTH</span><i /><span>STRIPE</span><i /><span>AI OPS</span></div>
    </div>
  );
}

function AgentsVisual() {
  const nodes = [
    { x: 80, y: 86, label: 'A&R' }, { x: 190, y: 58, label: 'MARKET' }, { x: 355, y: 94, label: 'LEGAL' },
    { x: 118, y: 294, label: 'ONBOARD' }, { x: 325, y: 302, label: 'ROYALTY' },
  ];
  return (
    <div className="gallery-visual gallery-visual--agents" aria-hidden="true">
      <div className="gallery-visual__hud"><span>MULTI-AGENT WORKFLOW</span><b>HUMAN-DIRECTED</b></div>
      <svg viewBox="0 0 460 420">
        <path className="agent-path" d="M80 86 230 210 190 58 230 210 355 94 230 210 118 294 230 210 325 302M80 86 190 58 355 94M118 294 325 302" />
        <circle className="agent-orbit" cx="230" cy="210" r="126" />
        <circle className="agent-orbit agent-orbit--inner" cx="230" cy="210" r="68" />
        {nodes.map((node, index) => <g className="agent-node" key={node.label} style={{ ['--agent-delay' as string]: `${index * 120}ms` }}><rect x={node.x - 29} y={node.y - 16} width="58" height="32" rx="3" /><text x={node.x} y={node.y + 4} textAnchor="middle">{node.label}</text></g>)}
        <circle className="agent-center" cx="230" cy="210" r="40" />
        <text className="gallery-visual__core-label" x="230" y="206" textAnchor="middle">JESSE</text>
        <text className="gallery-visual__core-label gallery-visual__core-label--small" x="230" y="221" textAnchor="middle">REVIEW</text>
      </svg>
      <div className="gallery-visual__footer"><span>TRIGGER</span><i /><span>AGENT OUTPUT</span><i /><span>HUMAN CHECKPOINT</span></div>
    </div>
  );
}

function GalleryVisual({ project }: { project: Project }) {
  if (project.visual === 'tetra') return <TetraVisual />;
  if (project.visual === 'components') return <ComponentsVisual />;
  if (project.visual === 'ecosystem') return <EcosystemVisual />;
  return <AgentsVisual />;
}

function DetailBlock({ title, copy, accent = false }: { title: string; copy: string; accent?: boolean }) {
  return <div className={`gallery-detail ${accent ? 'gallery-detail--accent' : ''}`}><p>{title}</p><span>{copy}</span></div>;
}

function GalleryRoom({ project, index, active, revealed, onActivate, onToggle }: GalleryRoomProps) {
  const reducedMotion = useReducedMotion();
  const reversed = index % 2 === 1;
  const detailsId = `${project.id}-details`;
  const direction = reversed ? 46 : -46;

  return (
    <motion.article
      className={`gallery-room ${reversed ? 'gallery-room--reverse' : ''} ${active ? 'is-active' : ''} ${revealed ? 'is-revealed' : ''}`}
      id={project.id}
      onViewportEnter={() => onActivate(project.id)}
      viewport={{ amount: 0.55, margin: '-12% 0px -12% 0px' }}
    >
      <motion.div className="gallery-room__copy" initial={reducedMotion ? false : { opacity: 0, x: direction, y: 22 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reducedMotion ? 0 : 0.82, ease }}>
        <div className="gallery-room__index"><span>{project.index}</span><i /><p>{project.category}</p></div>
        <p className="gallery-room__meta">{project.company} <b>·</b> {project.role} <b>·</b> {project.period}</p>
        <h3>{project.title}</h3>
        <p className="gallery-room__summary">{project.description}</p>
        <div className="gallery-room__metric"><span>PROOF POINT</span><b>{project.metric}</b></div>
        <button type="button" className="gallery-room__toggle" aria-expanded={revealed} aria-controls={detailsId} onClick={() => onToggle(project.id)}>{revealed ? 'CLOSE CASE NOTES' : 'OPEN CASE NOTES'} <ChevronDown size={15} /></button>
        <AnimatePresence initial={false}>
          {revealed && <motion.div id={detailsId} className="gallery-room__details" initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.46, ease }}>
            <DetailBlock title="CONTEXT" copy={project.context} />
            <DetailBlock title="CHALLENGE" copy={project.challenge} />
            <DetailBlock title="APPROACH" copy={project.approach} />
            <DetailBlock title="OUTCOME" copy={project.outcome} accent />
            <div className="gallery-room__artifacts"><p>ARTIFACTS</p>{project.artifacts.map((artifact) => <span key={artifact}>{artifact}</span>)}</div>
          </motion.div>}
        </AnimatePresence>
        {project.linkUrl ? <a href={project.linkUrl} target="_blank" rel="noreferrer" className="gallery-room__link">VISIT LIVE PLATFORM <ArrowUpRight size={15} /></a> : <a href="#contact" className="gallery-room__link">DISCUSS THIS SYSTEM <ArrowUpRight size={15} /></a>}
      </motion.div>
      <motion.div className="gallery-room__visual" initial={reducedMotion ? false : { opacity: 0, x: -direction, scale: 0.94 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reducedMotion ? 0 : 0.9, ease, delay: reducedMotion ? 0 : 0.08 }} onFocus={() => onActivate(project.id)} onClick={() => onToggle(project.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle(project.id); } }} tabIndex={0} role="button" aria-label={`${revealed ? 'Close' : 'Open'} ${project.title} case notes`} aria-controls={detailsId} aria-expanded={revealed}>
        <GalleryVisual project={project} />
        <span className="gallery-room__visual-hint">CLICK FOR CASE NOTES</span>
      </motion.div>
    </motion.article>
  );
}

export default function WorkGallery({ projects }: WorkGalleryProps) {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '');
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const scrollBehavior = reducedMotion ? 'auto' : 'smooth';

  const activate = (id: string) => setActiveId(id);
  const toggle = (id: string) => { setActiveId(id); setRevealedId((current) => current === id ? null : id); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      const currentIndex = projects.findIndex((project) => project.id === activeId);
      if (event.key === 'Escape') { setRevealedId(null); return; }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowDown' ? Math.min(currentIndex + 1, projects.length - 1) : Math.max(currentIndex - 1, 0);
      const next = projects[nextIndex];
      setActiveId(next.id);
      document.getElementById(next.id)?.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, projects, scrollBehavior]);

  return (
    <section ref={sectionRef} className="work-gallery" id="work" tabIndex={-1}>
      <header className="work-gallery__header">
        <div><p className="section-kicker">SELECTED SYSTEMS</p><h2>Walk into the<br /><em>evidence.</em></h2></div>
        <p>Four rooms. Four different kinds of leverage: enterprise operating systems, components at scale, ecosystem infrastructure, and agents with human judgment built in.</p>
      </header>
      <nav className="work-gallery__rail" aria-label="Selected systems">
        {projects.map((project) => <button type="button" className={activeId === project.id ? 'is-active' : ''} key={project.id} onClick={() => { activate(project.id); document.getElementById(project.id)?.scrollIntoView({ behavior: scrollBehavior, block: 'center' }); }}><span>{project.index}</span><i /><b>{project.company}</b></button>)}
      </nav>
      <div className="work-gallery__rooms">{projects.map((project, index) => <GalleryRoom key={project.id} project={project} index={index} active={activeId === project.id} revealed={revealedId === project.id} onActivate={activate} onToggle={toggle} />)}</div>
    </section>
  );
}
