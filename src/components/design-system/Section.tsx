import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & { eyebrow?: string; title?: ReactNode; };

export default function Section({ className, eyebrow, title, children, ...props }: SectionProps) {
  return <section className={cn('ds-section', className)} {...props}>{(eyebrow || title) && <header>{eyebrow && <p>{eyebrow}</p>}{title && <h2>{title}</h2>}</header>}{children}</section>;
}
