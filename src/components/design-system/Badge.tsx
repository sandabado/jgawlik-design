import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ds-badge', className)} {...props} />;
}
