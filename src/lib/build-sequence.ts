export type BuildStage = {
  count: number;
  shape: string;
  label: string;
  detail: string;
};

export const BUILD_SEQUENCE: BuildStage[] = [
  { count: 0, shape: 'Point', label: 'Concept', detail: 'Locate the signal' },
  { count: 1, shape: 'Spark', label: 'Foundation', detail: 'Form the core' },
  { count: 3, shape: 'Triangle', label: 'Core team', detail: 'Create a stable unit' },
  { count: 5, shape: 'Pentagon', label: 'Growth', detail: 'Open new revenue paths' },
  { count: 9, shape: 'Nonagon', label: 'Scale', detail: 'Broadcast the system' },
  { count: 12, shape: 'Dodecahedron', label: 'Multiplication', detail: 'Lock twelve faces into one resilient whole' },
  { count: 24, shape: 'Constellation', label: 'Network', detail: 'Distribute resilient nodes' },
];

export function polygonPoints(sides: number, radius: number, center = 210, rotation = -90) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = ((rotation + (360 / sides) * index) * Math.PI) / 180;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });
}

export function polygonPath(points: Array<{ x: number; y: number }>) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z';
}
