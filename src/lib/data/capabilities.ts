import type { Capability } from '@/types';

export const capabilities: Capability[] = [
  { category: 'DESIGN THINKING', glyph: 'triangle', items: ['User Research', 'Design Systems', 'Information Architecture', 'Prototyping', 'Accessibility', 'Brand Architecture'] },
  { category: 'TECHNICAL EXECUTION', glyph: 'square', items: ['Next.js 15 / React', 'TypeScript', 'Drizzle ORM / Postgres', 'Stripe Integration', 'Vercel Deployment', 'shadcn/ui'] },
  { category: 'AI / AGENTIC', glyph: 'pentagon', items: ['Agent Architecture', 'Workflow Automation', 'Human-AI Interaction', 'Prompt Engineering', 'Multi-Agent Orchestration', 'Edge AI / Privacy Design'] },
];
