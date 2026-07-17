'use client';

import { useEffect, useState } from 'react';
import Dodecahedron from './Dodecahedron';
import Mark from './Mark';

const projects = [
  {
    number: '01',
    title: 'Atlas',
    type: 'AI WORKFLOW PLATFORM',
    description: 'A command layer that turns scattered expertise into monitored, human-steerable agent workflows.',
    tags: ['Strategy', 'Product design', 'Agent architecture'],
    signal: 'ORCHESTRATION',
  },
  {
    number: '02',
    title: 'Signal / One',
    type: 'DECISION INTELLIGENCE',
    description: 'An AI-native workspace for seeing the patterns beneath critical operating decisions before they compound.',
    tags: ['Research', 'UX systems', 'Prototyping'],
    signal: 'INTELLIGENCE',
  },
  {
    number: '03',
    title: 'Mercury',
    type: 'ENTERPRISE AGENT EXPERIENCE',
    description: 'A trusted interface for teams to collaborate with specialized agents—and retain the context that matters.',
    tags: ['Design direction', 'Interaction', 'Design systems'],
    signal: 'COORDINATION',
  },
];

const practices = [
  ['01', 'Frame the system', 'Find the real constraint, map the people, tools, and context around it.'],
  ['02', 'Design the intelligence', 'Shape the agent roles, decision rights, memory, and feedback loops.'],
  ['03', 'Make it legible', 'Create interfaces that let people understand, direct, and trust the work.'],
  ['04', 'Ship the learning loop', 'Prototype, measure, and keep refining against the behavior in the wild.'],
];

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

export default function PortfolioShell() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <div className={`loader ${loaded ? 'loader--done' : ''}`} aria-hidden={loaded}>
        <div className="loader-orbit" />
        <Dodecahedron className="loader-shape" />
        <p>ALIGNING SYSTEMS <span>·</span> 001</p>
      </div>

      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="page-grid" aria-hidden="true" />

      <header className="site-header">
        <button className="wordmark" onClick={() => goTo('top')} aria-label="Back to the top">
          <Mark />
          <span>JESSE<br />GAWLIK</span>
        </button>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
          <button onClick={() => goTo('work')}>Selected work</button>
          <button onClick={() => goTo('approach')}>Approach</button>
          <button onClick={() => goTo('contact')}>Contact</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
        <div className="availability"><i /> AVAILABLE FOR SELECTED ENGAGEMENTS</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal reveal--1"><span>01</span> INDEPENDENT DESIGN PRACTICE</p>
          <h1>
            <span className="reveal reveal--2">AGENTIC</span>
            <span className="outline-word reveal reveal--3">SYSTEMS</span>
            <span className="reveal reveal--4">DESIGNER<span className="period">.</span></span>
          </h1>
          <div className="hero-bottom reveal reveal--5">
            <p>I design the intelligent products, agent workflows, and operating systems that make ambitious teams move with clarity.</p>
            <button className="round-link" onClick={() => goTo('work')}>EXPLORE<br />THE WORK <ArrowUpRight /></button>
          </div>
        </div>
        <div className="hero-object" aria-hidden="true">
          <div className="object-ring ring-a" />
          <div className="object-ring ring-b" />
          <Dodecahedron className="hero-geo" />
          <span className="object-label label-a">HUMAN<br />INTENT</span>
          <span className="object-label label-b">MACHINE<br />CAPABILITY</span>
          <span className="object-label label-c">MEANINGFUL<br />OUTCOMES</span>
        </div>
        <div className="hero-index">SCROLL TO OBSERVE <span>↓</span></div>
      </section>

      <section className="manifesto section" id="about">
        <p className="eyebrow"><span>02</span> POSITION</p>
        <div className="manifesto-content">
          <p className="manifesto-lead">The future isn’t an interface with a chatbot bolted on.</p>
          <p>It is a new kind of system: one where human judgment, autonomous execution, and organizational memory are deliberately composed. That is the design problem I solve.</p>
          <div className="signature"><Mark /><span>BUILT FOR THE<br />UNFOLDING FUTURE</span></div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading">
          <p className="eyebrow"><span>03</span> SELECTED SYSTEMS</p>
          <p className="heading-note">A selection of explorations in intelligence, interaction, and new ways of working.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className="project-no">{project.number}</div>
              <div className="project-visual">
                <div className="project-grid" />
                <span>{project.signal}</span>
                <div className="signal-shape"><i /><i /><i /><i /></div>
              </div>
              <div className="project-copy">
                <p className="project-type">{project.type}</p>
                <h2>{project.title}<span>.</span></h2>
                <p>{project.description}</p>
                <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <button className="project-link" aria-label={`View ${project.title} project`}><ArrowUpRight /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section" id="approach">
        <div className="approach-title">
          <p className="eyebrow"><span>04</span> OPERATING PRINCIPLE</p>
          <h2>Complexity is not the enemy.<br /><em>Ambiguity is.</em></h2>
        </div>
        <div className="practice-list">
          {practices.map(([number, title, description]) => (
            <article className="practice" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <i className="practice-dot" />
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <p className="eyebrow"><span>05</span> START A CONVERSATION</p>
        <div className="contact-main">
          <div>
            <h2>Let’s build<br />what’s <em>next.</em></h2>
            <a href="mailto:hello@jessegawlik.com" className="contact-link">hello@jessegawlik.com <ArrowUpRight /></a>
          </div>
          <Dodecahedron className="contact-geo" labelled />
        </div>
      </section>

      <footer>
        <div><Mark /><span>JESSE GAWLIK<br />AGENTIC SYSTEMS DESIGNER</span></div>
        <span>© {new Date().getFullYear()} / LOS ANGELES, CA</span>
        <a href="#top" onClick={(event) => { event.preventDefault(); goTo('top'); }}>BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
