const seals = {
  earth: '◆',
  water: '◌',
  fire: '△',
  air: '◇',
  ether: '⊙',
} as const;

export type AlchemicalElement = keyof typeof seals;

export default function AlchemicalSeal({ element = 'ether', compact = false }: { element?: AlchemicalElement; compact?: boolean }) {
  return (
    <div className={`alchemical-seal${compact ? ' alchemical-seal--compact' : ''}`} aria-label={`${element} seal`}>
      <i />
      <span>{seals[element]}</span>
      <i />
    </div>
  );
}
