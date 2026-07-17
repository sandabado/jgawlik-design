import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jesse Gawlik — Agentic Systems Designer',
  description: 'I design and ship autonomous AI products. Enterprise-grade design thinking. Full-stack execution. Agentic workflow architecture. Former American Express. Founder of Whole Body.',
  keywords: ['Agentic AI', 'Product Designer', 'Systems Designer', 'Next.js', 'Full-Stack', 'Enterprise UX'],
  authors: [{ name: 'Jesse Gawlik' }],
  openGraph: {
    title: 'Jesse Gawlik — Agentic Systems Designer',
    description: 'Enterprise-grade design thinking. Full-stack execution. Agentic workflow architecture.',
    type: 'website',
    url: 'https://jessegawlik.com',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
