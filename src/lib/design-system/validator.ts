import type { FigmaColor, FigmaNode, ValidationIssue } from './types';

const luminance = (color: FigmaColor) => {
  const channel = (value: number) => { const normalized = value <= 1 ? value : value / 255; return normalized <= .03928 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4; };
  return .2126 * channel(color.r) + .7152 * channel(color.g) + .0722 * channel(color.b);
};

export function contrastRatio(foreground: FigmaColor, background: FigmaColor) { const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a); return (light + .05) / (dark + .05); }

export function validateFigmaNode(node: FigmaNode, issues: ValidationIssue[] = []): ValidationIssue[] {
  const bounds = node.absoluteBoundingBox;
  if (/button|input|select|toggle/i.test(node.name) && bounds && (bounds.width < 44 || bounds.height < 44)) issues.push({ code: 'touch-target', severity: 'warning', message: 'Interactive controls should be at least 44 × 44 px.', nodeId: node.id });
  if (node.type === 'TEXT' && !node.characters?.trim()) issues.push({ code: 'empty-text', severity: 'warning', message: 'Text node has no content.', nodeId: node.id });
  if (node.type === 'TEXT' && (node.style?.fontSize || 16) < 12) issues.push({ code: 'small-text', severity: 'warning', message: 'Text below 12 px may be difficult to read.', nodeId: node.id });
  if (node.children?.length) node.children.forEach((child) => validateFigmaNode(child, issues));
  return issues;
}
