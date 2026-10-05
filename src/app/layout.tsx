import type { Metadata } from 'next';
import './globals.css';
import { isPublicGateEnabled } from '@/lib/gating/config';
import { isPortfolioMode } from '@/lib/portfolio-access/session';

const portfolioMetadata: Metadata = {
  title: 'Jesse Gawlik — Agentic Systems Architect',
  description: 'Building and stress-testing AI-assisted products and agentic workflows, informed by senior-level enterprise experience and hands-on implementation. Currently at American Express. Founder of Whole Body.',
  keywords: ['Agentic AI', 'Product Designer', 'Systems Architect', 'Next.js', 'Full-Stack', 'Enterprise UX'],
  authors: [{ name: 'Jesse Gawlik' }],
  openGraph: {
    title: 'Jesse Gawlik — Agentic Systems Architect',
    description: 'Building and stress-testing AI-assisted products. Senior-level enterprise experience. Hands-on implementation and human-reviewed agentic workflows.',
    type: 'website',
    url: 'https://jessegawlik.com',
  },
};

export function generateMetadata(): Metadata {
  if (isPortfolioMode()) return {
    title: 'Jesse Gawlik — Private Portfolio',
    description: 'Private portfolio access.',
    keywords: [],
    robots: { index: false, follow: false, noarchive: true },
    openGraph: { title: 'Jesse Gawlik — Private Portfolio', description: 'Private portfolio access.', type: 'website', url: 'https://portfolio.jessegawlik.com' },
  };
  if (!isPublicGateEnabled()) return portfolioMetadata;
  return {
    title: 'Jesse Gawlik — The System is Being Rebuilt.',
    description: 'We are gathering the fire. The field is quiet, preparing for the next turn.',
    authors: [{ name: 'Jesse Gawlik' }],
    robots: { index: false, follow: false, noarchive: true },
    openGraph: {
      title: 'Jesse Gawlik — The System is Being Rebuilt.',
      description: 'We are gathering the fire. The field is quiet, preparing for the next turn.',
      type: 'website',
      url: 'https://jessegawlik.com',
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
