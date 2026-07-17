'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BUILD_SEQUENCE, polygonPath, polygonPoints } from '@/lib/build-sequence';

type BuildGlyphProps = {
  stageIndex: number;
  className?: string;
  compact?: boolean;
};

const center = 210;
const cubicEase = [0.16, 1, 0.3, 1] as const;
const phi = (1 + Math.sqrt(5)) / 2;
const dodecahedronVertices = [
  [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
  [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1],
  [0, -1 / phi, -phi], [0, -1 / phi, phi], [0, 1 / phi, -phi], [0, 1 / phi, phi],
  [-1 / phi, -phi, 0], [-1 / phi, phi, 0], [1 / phi, -phi, 0], [1 / phi, phi, 0],
  [-phi, 0, -1 / phi], [-phi, 0, 1 / phi], [phi, 0, -1 / phi], [phi, 0, 1 / phi],
] as const;

const dodecahedronProjection = dodecahedronVertices.map(([x, y, z]) => {
  const yaw = Math.PI / 5;
  const pitch = -Math.PI / 8;
  const xYaw = x * Math.cos(yaw) + z * Math.sin(yaw);
  const zYaw = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const yPitch = y * Math.cos(pitch) - zYaw * Math.sin(pitch);
  const depth = y * Math.sin(pitch) + zYaw * Math.cos(pitch);
  return { x: center + xYaw * 86, y: center + yPitch * 86, depth };
});

const dodecahedronEdges = dodecahedronProjection.flatMap((point, index) => dodecahedronProjection.slice(index + 1).flatMap((target, targetOffset) => {
  const [x1, y1, z1] = dodecahedronVertices[index];
  const [x2, y2, z2] = dodecahedronVertices[index + targetOffset + 1];
  const distance = Math.hypot(x1 - x2, y1 - y2, z1 - z2);
  if (Math.abs(distance - 2 / phi) > 0.001) return [];
  return [{ d: `M${point.x} ${point.y} L${target.x} ${target.y}`, depth: (point.depth + target.depth) / 2 }];
})).sort((first, second) => first.depth - second.depth);

const dodecahedronFaceIndices = [
  [0, 12, 14, 4, 8], [0, 16, 2, 10, 8], [0, 16, 17, 1, 12], [1, 12, 14, 5, 9],
  [1, 17, 3, 11, 9], [2, 13, 15, 6, 10], [2, 16, 17, 3, 13], [3, 13, 15, 7, 11],
  [4, 18, 6, 10, 8], [4, 18, 19, 5, 14], [5, 19, 7, 11, 9], [6, 18, 19, 7, 15],
];

const dodecahedronFaces = dodecahedronFaceIndices.map((indices) => {
  const vertices = indices.map((index) => dodecahedronProjection[index]);
  return {
    points: vertices.map((vertex) => `${vertex.x},${vertex.y}`).join(' '),
    depth: vertices.reduce((total, vertex) => total + vertex.depth, 0) / vertices.length,
  };
}).sort((first, second) => first.depth - second.depth);

const constellation = Array.from({ length: 24 }, (_, index) => {
  const rings = [151, 100, 54];
  const radius = rings[Math.floor(index / 9)] ?? 54;
  const localIndex = index < 9 ? index : index < 18 ? index - 9 : index - 18;
  const total = index < 18 ? 9 : 6;
  const offset = index < 9 ? -90 : index < 18 ? -70 : -90;
  const angle = ((offset + (360 / total) * localIndex) * Math.PI) / 180;
  return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
});

function GlyphPath({ d, index = 0 }: { d: string; index?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: cubicEase }}
    />
  );
}

function DodecahedronGlyph({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <>
      {dodecahedronFaces.map((face, faceIndex) => {
        const fillOpacity = face.depth < -0.4 ? 0.018 : face.depth < 0.35 ? 0.055 : 0.12;
        return <motion.polygon key={face.points} points={face.points} fill="currentColor" fillOpacity={fillOpacity} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : .42, delay: reducedMotion ? 0 : faceIndex * .045, ease: cubicEase }} />;
      })}
      {dodecahedronEdges.map((edge, edgeIndex) => {
        const opacity = edge.depth < -0.4 ? 0.34 : edge.depth < 0.35 ? 0.66 : 1;
        return <motion.path key={edge.d} d={edge.d} fill="none" stroke="currentColor" strokeWidth={edge.depth < -0.4 ? .9 : 1.28} strokeOpacity={opacity} vectorEffect="non-scaling-stroke" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity }} transition={{ duration: reducedMotion ? 0 : 0.66, delay: reducedMotion ? 0 : edgeIndex * 0.035, ease: cubicEase }} />;
      })}
      {dodecahedronProjection.map((vertex, vertexIndex) => <motion.circle key={`dodecahedron-vertex-${vertexIndex}`} cx={vertex.x} cy={vertex.y} r={vertex.depth > 0.3 ? 2.8 : 1.8} fill="currentColor" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: vertex.depth < -0.4 ? .42 : .94, scale: 1 }} transition={{ duration: reducedMotion ? 0 : .25, delay: reducedMotion ? 0 : .56 + vertexIndex * .028 }} style={{ transformOrigin: `${vertex.x}px ${vertex.y}px` }} />)}
    </>
  );
}

export default function BuildGlyph({ stageIndex, className = '', compact = false }: BuildGlyphProps) {
  const reducedMotion = useReducedMotion();
  const index = Math.min(Math.max(stageIndex, 0), BUILD_SEQUENCE.length - 1);
  const stage = BUILD_SEQUENCE[index];
  const commonTransition = reducedMotion ? { duration: 0 } : { duration: 0.48, ease: cubicEase };
  const polygonSides = index === 2 ? 3 : index === 3 ? 5 : index === 4 ? 9 : 0;
  const polygon = polygonSides ? polygonPath(polygonPoints(polygonSides, 146)) : '';

  return (
    <svg className={`build-glyph ${compact ? 'build-glyph--compact' : ''} ${className}`} viewBox="0 0 420 420" fill="none" aria-hidden="true">
      <circle className="build-glyph__orbit build-glyph__orbit--outer" cx={center} cy={center} r="174" />
      <circle className="build-glyph__orbit build-glyph__orbit--inner" cx={center} cy={center} r="112" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.g
          key={stage.count}
          initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.12, rotate: 10 }}
          transition={commonTransition}
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          {index === 0 && (
            <motion.circle
              cx={center}
              cy={center}
              r="7"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.7, 1], opacity: 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: cubicEase }}
              style={{ transformOrigin: `${center}px ${center}px` }}
            />
          )}
          {index === 1 && ['M210 210 210 74', 'M210 210 346 210', 'M210 210 210 346', 'M210 210 74 210'].map((d, pathIndex) => <GlyphPath d={d} index={pathIndex} key={d} />)}
          {polygon && <GlyphPath d={polygon} />}
          {index === 5 && <DodecahedronGlyph reducedMotion={reducedMotion} />}
          {index === 6 && (
            <>
              {constellation.map((node, nodeIndex) => {
                const target = constellation[(nodeIndex * 5 + 7) % constellation.length];
                return <GlyphPath d={`M ${node.x} ${node.y} L ${target.x} ${target.y}`} index={nodeIndex % 7} key={`line-${nodeIndex}`} />;
              })}
              {constellation.map((node, nodeIndex) => (
                <motion.circle
                  key={`node-${nodeIndex}`}
                  cx={node.x}
                  cy={node.y}
                  r={nodeIndex % 6 === 0 ? 3.5 : 2}
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.28, delay: 0.2 + nodeIndex * 0.025 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              ))}
            </>
          )}
          {index > 1 && index < 6 && polygonSides > 0 && polygonPoints(polygonSides, 146).map((node, nodeIndex) => (
            <motion.circle key={`vertex-${nodeIndex}`} cx={node.x} cy={node.y} r="3" fill="currentColor" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={reducedMotion ? { duration: 0 } : { delay: 0.25 + nodeIndex * 0.06, duration: 0.3 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }} />
          ))}
        </motion.g>
      </AnimatePresence>
      <motion.circle className="build-glyph__core" cx={center} cy={center} r={compact ? 27 : 37} initial={false} animate={{ scale: index === 0 ? [1, 1.18, 1] : 1 }} transition={reducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
      <text x={center} y={compact ? 217 : 222} textAnchor="middle" className="build-glyph__number">{stage.count}</text>
    </svg>
  );
}
