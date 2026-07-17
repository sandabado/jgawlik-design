import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string; };

export default function Input({ className, id, label, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return <label className="ds-input-wrap">{label && <span>{label}</span>}<input id={inputId} className={cn('ds-input', className)} {...props} /></label>;
}
