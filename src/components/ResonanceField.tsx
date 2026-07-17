export default function ResonanceField() {
  return (
    <div className="resonance-field" aria-hidden="true">
      <div className="resonance-object resonance-object--sphere"><i /><i /><i /></div>
      <div className="resonance-object resonance-object--prism">
        <svg viewBox="0 0 200 220" fill="none"><path d="M100 10 184 61v98L100 210 16 159V61L100 10Z" /><path d="m100 10 52 80-52 120L48 90 100 10Z" /><path d="m16 61 84 29 84-29M100 90v120" /></svg>
      </div>
      <div className="resonance-object resonance-object--ring"><i /><i /><i /></div>
      <div className="resonance-pulse resonance-pulse--one" /><div className="resonance-pulse resonance-pulse--two" />
      <span className="resonance-label resonance-label--one">HUMAN INTENT</span>
      <span className="resonance-label resonance-label--two">SYSTEMS IN MOTION</span>
      <span className="resonance-label resonance-label--three">MACHINE CAPABILITY</span>
    </div>
  );
}
