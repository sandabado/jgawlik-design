type DodecahedronProps = { className?: string; labelled?: boolean };

export default function Dodecahedron({ className = '', labelled = false }: DodecahedronProps) {
  return (
    <svg className={className} viewBox="0 0 420 420" fill="none" role={labelled ? 'img' : undefined} aria-label={labelled ? 'Abstract agentic systems geometry' : undefined}>
      <g className="geo-lines">
        <path d="M210 42 328 110v138L210 316 92 248V110L210 42Z" />
        <path d="m210 42 73 57-28 85-90 0-28-85 73-57Z" />
        <path d="m92 110 73 74-27 94-46-30V110Zm236 0-73 74 27 94 46-30V110Z" />
        <path d="m210 316 72-38 46-30-73-64-90 0-73 64 46 30 72 38Z" />
        <path d="m137 99 28 85 45 52 45-52 28-85M165 184l-27 94m117-94 27 94M210 236v80" />
      </g>
      <g className="geo-nodes">
        {[['210', '42'], ['328', '110'], ['328', '248'], ['210', '316'], ['92', '248'], ['92', '110'], ['210', '236'], ['165', '184'], ['255', '184']].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />)}
      </g>
    </svg>
  );
}
