import type { Metadata } from 'next';
import './globals.css';
import { isPublicGateEnabled } from '@/lib/gating/config';
import { isPortfolioMode } from '@/lib/portfolio-access/session';

const portfolioMetadata: Metadata = {
  title: 'Jesse Gawlik — Agentic Systems Architect',
  description: 'I design and ship autonomous AI products. Enterprise-grade design thinking. Full-stack execution. Agentic workflow architecture. Currently at American Express. Founder of Whole Body.',
  keywords: ['Agentic AI', 'Product Design', 'Systems Architect', 'Next.js', 'Full-Stack', 'Enterprise UX'],
  authors: [{ name: 'Jesse Gawlik' }],
  openGraph: {
    title: 'Jesse Gawlik — Agentic Systems Architect',
    description: 'Enterprise-grade design thinking. Full-stack execution. Agentic workflow architecture.',
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
