import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ds-card', className)} {...props} />;
}
