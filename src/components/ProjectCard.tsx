'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import Dodecahedron from './Dodecahedron';
import Glyph from './Glyph';
import AlchemicalSeal, { type AlchemicalElement } from './AlchemicalSeal';

const projectElements: Record<string, AlchemicalElement> = {
  'amex-virtual-cards': 'earth',
  'thermo-fisher': 'water',
  'wholebody-earth': 'fire',
  'agentic-ai': 'air',
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.category === 'ai') {
    return <div className="workflow-visual" aria-hidden="true"><span>INPUT</span><i className="workflow-node node-a" /><i className="workflow-node node-b" /><i className="workflow-node node-c" /><i className="workflow-node node-d" /><b>AGENT<br />MESH</b><small>OUTCOME</small><svg viewBox="0 0 400 280"><path d="M70 68 180 138 315 65M70 68 140 227 180 138 265 224 315 65M140 227 265 224" /></svg></div>;
  }
  if (project.category === 'founder') {
    return <div className="platform-visual" aria-hidden="true"><div className="platform-visual__nav"><i /><i /><i /></div><div className="platform-visual__copy"><span>WHOLE BODY / ECOSYSTEM</span><b>Five pillars.<br />One system.</b></div><div className="platform-visual__columns"><i /><i /><i /><i /><i /></div><Dodecahedron /></div>;
  }
  return <div className={`solid-visual solid-visual--${project.index}`} aria-hidden="true"><span>{project.company.toUpperCase()}</span><Glyph name={project.index === '01' ? 'octahedron' : 'hexagon'} /><i /><i /><i /></div>;
}

export default function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <article className={`project-card ${reverse ? 'project-card--reverse' : ''}`} id={project.id}>
      <motion.div className="project-card__content" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <AlchemicalSeal element={projectElements[project.id] ?? 'ether'} compact />
        <p className="project-card__meta"><span>{project.index}</span> — <b>{project.category}</b></p>
        <h3>{project.title}</h3>
        <p className="project-card__company">{project.company} · {project.role} · {project.period}</p>
        <p className="project-card__description">{project.description}</p>
        <dl><div><dt>PROBLEM</dt><dd>{project.problem}</dd></div><div><dt>APPROACH</dt><dd>{project.approach}</dd></div><div><dt>OUTCOME</dt><dd>{project.outcome}</dd></div></dl>
        <ul className="tag-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        {project.linkUrl ? <a href={project.linkUrl} target="_blank" rel="noreferrer" className="project-card__link">VISIT LIVE SITE <ArrowUpRight size={15} /></a> : <a href="#contact" className="project-card__link">DISCUSS THE WORK <ArrowUpRight size={15} /></a>}
      </motion.div>
      <motion.div className="project-card__visual" initial={{ opacity: 0, x: reverse ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><ProjectVisual project={project} /></motion.div>
    </article>
  );
}
