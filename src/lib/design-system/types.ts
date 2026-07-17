export type FigmaNodeType = 'FRAME' | 'GROUP' | 'COMPONENT' | 'INSTANCE' | 'RECTANGLE' | 'ELLIPSE' | 'TEXT' | 'VECTOR';

export interface FigmaColor { r: number; g: number; b: number; a?: number; }
export interface FigmaPaint { type: 'SOLID' | 'GRADIENT_LINEAR' | 'IMAGE'; visible?: boolean; color?: FigmaColor; }
export interface FigmaEffect { type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR'; visible?: boolean; radius?: number; color?: FigmaColor; }
export interface FigmaTextStyle { fontSize?: number; fontWeight?: number; letterSpacing?: number; textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'; }
export interface FigmaPadding { top?: number; right?: number; bottom?: number; left?: number; }
export interface FigmaBounds { width: number; height: number; }
export interface FigmaNode {
  id: string;
  name: string;
  type: FigmaNodeType;
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  effects?: FigmaEffect[];
  constraints?: { horizontal?: string; vertical?: string };
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE';
  padding?: FigmaPadding;
  absoluteBoundingBox?: FigmaBounds;
  style?: FigmaTextStyle;
  characters?: string;
  children?: FigmaNode[];
}

export interface ReactComponent {
  name: string;
  props: string;
  jsx: string;
  styles: string;
  imports: string[];
  source: string;
}

export type ValidationSeverity = 'error' | 'warning' | 'info';
export interface ValidationIssue { code: string; severity: ValidationSeverity; message: string; nodeId: string; }
export interface TranslationResult { component: ReactComponent; issues: ValidationIssue[]; }
