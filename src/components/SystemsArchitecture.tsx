'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

type Layer = {
  id: string;
  name: string;
  function: string;
  question: string;
  detail: string;
  artifacts: string[];
};

const layers: Layer[] = [
  { id: 'direction', name: 'Direction', function: 'Vision, roadmap, sequencing', question: 'Where are we going?', detail: 'Turns an uncertain opportunity into a staged route: what moves first, what has to be true, and what each successful phase unlocks next.', artifacts: ['Roadmap architecture', 'Sequencing model', 'Decision framing'] },
  { id: 'validation', name: 'Validation', function: 'Hypothesis, testing, iteration', question: 'Does it work?', detail: 'Makes assumptions observable. Research, experiments, and real-world feedback become a working evidence loop rather than a presentation ritual.', artifacts: ['Research protocols', 'Experiment design', 'Evidence loops'] },
  { id: 'execution', name: 'Execution', function: 'SOPs, delivery, workflows', question: 'How do we deliver?', detail: 'Converts ambitious thinking into repeatable work: clear roles, operating rhythms, and workflows that keep quality intact at speed.', artifacts: ['Operating models', 'Workflow systems', 'Delivery playbooks'] },
  { id: 'protection', name: 'Protection', function: 'Legal architecture, compliance, risk', question: 'How do we protect it?', detail: 'Designs for resilience early by making risk, governance, and compliance constraints part of the product and organizational system.', artifacts: ['Risk mapping', 'Governance models', 'Decision guardrails'] },
  { id: 'knowledge', name: 'Knowledge', function: 'Education, documentation, memory', question: 'How do we teach it?', detail: 'Builds a durable institutional memory. Documentation becomes a product surface that helps teams learn, decide, and onboard without friction.', artifacts: ['Knowledge systems', 'Curriculum design', 'Documentation strategy'] },
  { id: 'culture', name: 'Culture', function: 'Values, cohesion, sustainability', question: 'Why does it matter?', detail: 'Makes the operating system humane enough to last. Shared rituals, values, and feedback practices protect team coherence as complexity rises.', artifacts: ['Team rituals', 'Cohesion practices', 'Sustainability signals'] },
  { id: 'flow', name: 'Flow', function: 'Revenue distribution, compensation', question: 'How does it sustain itself?', detail: 'Treats economics as a designed system: incentive clarity, resource allocation, and sustainable flow sit beside the user experience.', artifacts: ['Revenue models', 'Incentive design', 'Resource allocation'] },
  { id: 'infrastructure', name: 'Infrastructure', function: 'Physical and digital build', question: 'What carries the system?', detail: 'Connects the real build: platforms, tools, services, environments, and the operational substrate that makes the experience dependable.', artifacts: ['Platform models', 'Service blueprints', 'Technical ecosystems'] },
  { id: 'feedback', name: 'Feedback', function: 'Adaptation, redundancy, renewal', question: 'How does it heal itself?', detail: 'Closes the loop. Failure becomes evidence, evidence changes the model, and the model can keep adapting without a single point of failure.', artifacts: ['Feedback protocols', 'Resilience loops', 'Adaptation models'] },
];

const scaling = [0, 1, 3, 5, 9, 12, 24];
const nodeAngles = layers.map((_, index) => -90 + index * (360 / layers.length));
const yantraTriangles = [
  { rotation: 0, scale: 1 },
  { rotation: 180, scale: 1 },
  { rotation: 0, scale: 0.86 },
  { rotation: 180, scale: 0.86 },
  { rotation: 0, scale: 0.71 },
  { rotation: 180, scale: 0.71 },
  { rotation: 0, scale: 0.56 },
  { rotation: 180, scale: 0.56 },
  { rotation: 0, scale: 0.4 },
];

function nodeStyle(index: number): CSSProperties {
  return { '--architecture-node-angle': `${nodeAngles[index]}deg` } as CSSProperties;
}

export default function SystemsArchitecture() {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const directoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const active = layers[activeIndex];

  const selectLayer = (index: number) => setActiveIndex(index);

  const onLayerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, refs: Array<HTMLButtonElement | null>) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % layers.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + layers.length) % layers.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = layers.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    selectLayer(nextIndex);
    refs[nextIndex]?.focus();
  };

  return (
    <section className="architecture-section" id="architecture" aria-labelledby="architecture-heading">
      <header className="architecture-section__header">
        <p className="section-kicker">THE ARCHITECTURE · 9 + 1</p>
        <h2 id="architecture-heading">Nine systems.<br /><em>One adaptive core.</em></h2>
        <p>Products only survive when their surrounding systems do. Every system stays visible; select a named layer or its numbered point to inspect the operating logic underneath the interface.</p>
      </header>

      <div className="architecture-oracle">
        <div className="architecture-oracle__field" aria-hidden="true">
          <svg className="architecture-oracle__yantra" viewBox="0 0 600 600" focusable="false">
            <defs>
              <radialGradient id="architecture-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8d76ff" stopOpacity=".28" />
                <stop offset="66%" stopColor="#5d3fd3" stopOpacity=".07" />
                <stop offset="100%" stopColor="#07060b" stopOpacity="0" />
              </radialGradient>
              <filter id="architecture-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <circle className="architecture-oracle__glow" cx="300" cy="300" r="246" />
            <circle className="architecture-oracle__orbit architecture-oracle__orbit--outer" cx="300" cy="300" r="238" />
            <circle className="architecture-oracle__orbit architecture-oracle__orbit--middle" cx="300" cy="300" r="182" />
            <circle className="architecture-oracle__orbit architecture-oracle__orbit--inner" cx="300" cy="300" r="121" />
            <g className="architecture-oracle__triangles">
              {yantraTriangles.map((triangle, index) => (
                <polygon
                  key={`${triangle.rotation}-${triangle.scale}`}
                  points="300,45 536,454 64,454"
                  transform={`translate(300 300) rotate(${triangle.rotation}) scale(${triangle.scale}) translate(-300 -300)`}
                  style={{ '--triangle-delay': `${index * 130}ms` } as CSSProperties}
                />
              ))}
            </g>
            <circle className="architecture-oracle__bindu" cx="300" cy="300" r="7" filter="url(#architecture-soft-glow)" />
          </svg>
          <p className="architecture-oracle__coordinates">SRI YANTRA / SYSTEM FIELD / 09 NODES</p>
        </div>

        <div className="architecture-oracle__nodes" aria-label="Nine systems dimensions">
          {layers.map((layer, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                className={`architecture-oracle__node${isActive ? ' is-active' : ''}`}
                type="button"
                key={layer.id}
                ref={(node) => { nodeRefs.current[index] = node; }}
                style={nodeStyle(index)}
                aria-label={`${String(index + 1).padStart(2, '0')}. ${layer.name}. ${layer.question}`}
                aria-controls="architecture-console"
                aria-pressed={isActive}
                onClick={() => selectLayer(index)}
                onKeyDown={(event) => onLayerKeyDown(event, index, nodeRefs.current)}
              >
                <span className="architecture-oracle__node-mark" aria-hidden="true">
                  <i />
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </span>
                <span className="architecture-oracle__node-label" aria-hidden="true">{layer.name}</span>
              </button>
            );
          })}
        </div>

        <article className="architecture-console" id="architecture-console" role="tabpanel" aria-labelledby={`architecture-tab-${active.id}`} aria-live="polite" aria-atomic="true">
          <div className="architecture-console__chrome">
            <span>LIVE SYSTEM READOUT</span>
            <i />
            <b>9 + 1</b>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="architecture-console__stream"
              key={active.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="architecture-console__index">
                <span>NODE {String(activeIndex + 1).padStart(2, '0')} / 09</span>
                <i>{active.function}</i>
              </div>
              <h3>{active.name}</h3>
              <p className="architecture-console__question">{active.question}</p>
              <p className="architecture-console__detail">{active.detail}</p>
              <ul aria-label={`${active.name} artifacts`}>
                {active.artifacts.map((artifact) => <li key={artifact}>{artifact}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
          <p className="architecture-console__instruction">SELECT A NUMBER · ARROW KEYS TO TRAVERSE</p>
        </article>
      </div>

      <nav className="architecture-directory" aria-label="System directory">
        <div className="architecture-directory__heading">
          <span>SYSTEM DIRECTORY / 09</span>
          <p>Every system is visible. Select a layer to update the live console.</p>
        </div>
        <div className="architecture-directory__grid" role="tablist" aria-label="Nine operating systems">
          {layers.map((layer, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                role="tab"
                className={isActive ? 'is-active' : ''}
                key={layer.id}
                id={`architecture-tab-${layer.id}`}
                ref={(node) => { directoryRefs.current[index] = node; }}
                aria-selected={isActive}
                aria-controls="architecture-console"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectLayer(index)}
                onKeyDown={(event) => onLayerKeyDown(event, index, directoryRefs.current)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{layer.name}</b>
                <i>{layer.question}</i>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="architecture-caption">
        <span>9 SYSTEMS</span>
        <i />
        <p>Direction, validation, execution, protection, knowledge, culture, flow, infrastructure, and feedback converge in one renewable operating core.</p>
        <i />
        <span>1 CORE</span>
      </div>

      <div className="scaling-model">
        <div><p className="section-kicker">SCALING MODEL</p><h3>Each build phase unlocks the next.</h3></div>
        <ol>{scaling.map((count, index) => <li key={count}><span>{String(count).padStart(2, '0')}</span>{index < scaling.length - 1 && <i />}</li>)}</ol>
      </div>
    </section>
  );
}
