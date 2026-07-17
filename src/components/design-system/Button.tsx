import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg'; };

export default function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <button className={cn('ds-button', `ds-button--${variant}`, `ds-button--${size}`, className)} {...props} />;
}
