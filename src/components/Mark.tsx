type MarkProps = { className?: string };

export default function Mark({ className = '' }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 58 58" fill="none" aria-hidden="true">
      <path d="M29 3.5 51.1 16.25v25.5L29 54.5 6.9 41.75v-25.5L29 3.5Z" stroke="currentColor" />
      <path d="m29 3.5 13.75 20.25L29 43.5 15.25 23.75 29 3.5Z" stroke="currentColor" />
      <path d="m6.9 16.25 22.1 12.8 22.1-12.8M29 29.05v25.4M15.25 23.75 6.9 41.75m35.85-18L51.1 41.75" stroke="currentColor" />
    </svg>
  );
}
