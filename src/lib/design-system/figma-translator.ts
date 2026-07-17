import type { FigmaColor, FigmaNode, FigmaPaint, ReactComponent } from './types';

const tokenColors: Record<string, string> = {
  '#08080A': 'bg-background', '#141416': 'bg-surface-1', '#1C1C1F': 'bg-surface-2', '#E8E8EC': 'text-foreground', '#6D4AFF': 'bg-ember', '#D4AF37': 'bg-gold', '#8A8A92': 'text-muted',
};

function indent(value: string, spaces = 2) { return value.split('\n').map((line) => `${' '.repeat(spaces)}${line}`).join('\n'); }
function safeText(value: string) { return value.replace(/[{}]/g, ''); }

export class FigmaTranslator {
  translate(node: FigmaNode): ReactComponent {
    const name = this.extractComponentName(node.name);
    const props = this.formatPropTypes(this.extractProps(node));
    const rootJsx = this.generateJSX(node, true);
    const jsx = `return (\n${indent(rootJsx, 4)}\n  );`;
    const styles = this.extractStylesFromFigma(node);
    const imports = ["import { cn } from '@/lib/utils';", "import type { HTMLAttributes, ReactNode } from 'react';"];
    const source = `${imports.join('\n')}\n\nexport interface ${name}Props extends HTMLAttributes<HTMLDivElement> {\n${indent(props, 2)}\n}\n\nexport function ${name}({ children, className, ...props }: ${name}Props) {\n  ${jsx}\n}\n`;
    return { name, props, jsx, styles, imports, source };
  }

  extractComponentName(name: string): string {
    const words = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
    return (words.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join('') || 'FigmaComponent').replace(/^\d/, 'Component');
  }

  extractProps(node: FigmaNode): string[] {
    const props = ['children?: ReactNode;', 'className?: string;'];
    if ((node.fills?.length ?? 0) > 0) props.push("variant?: 'primary' | 'secondary';");
    if (node.constraints?.horizontal) props.push("size?: 'sm' | 'md' | 'lg';");
    if (/button/i.test(node.name)) props.push('disabled?: boolean;', 'onClick?: () => void;');
    return props;
  }

  formatPropTypes(props: string[]): string {
    return props.join('\n');
  }

  generateJSX(node: FigmaNode, isRoot = false): string {
    const classes = this.extractStylesFromFigma(node) || 'relative';
    if (node.type === 'TEXT') return `<span className="${classes}">${safeText(node.characters || node.name)}</span>`;
    if (node.type === 'VECTOR') return '<svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" />';
    const tag = /button/i.test(node.name) ? 'button' : 'div';
    const componentClass = isRoot ? `cn('${classes}', className)` : `'${classes}'`;
    const children = node.children?.map((child) => this.generateJSX(child)).join('\n') || (isRoot ? '{children}' : '');
    if (!children) return `<${tag} className={${componentClass}} />`;
    return `<${tag} className={${componentClass}}>\n${indent(children, 2)}\n</${tag}>`;
  }

  extractStylesFromFigma(node: FigmaNode): string {
    const styles = [this.getLayoutClasses(node), this.getBoxClasses(node), this.getTextClasses(node)].filter(Boolean);
    return styles.join(' ');
  }

  getLayoutClasses(node: FigmaNode): string {
    const classes: string[] = [];
    if (node.layoutMode === 'HORIZONTAL') classes.push('flex');
    if (node.layoutMode === 'VERTICAL') classes.push('flex', 'flex-col');
    if (node.primaryAxisAlignItems === 'CENTER') classes.push('justify-center');
    if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') classes.push('justify-between');
    if (node.counterAxisAlignItems === 'CENTER') classes.push('items-center');
    return classes.join(' ');
  }

  getBoxClasses(node: FigmaNode): string {
    const classes: string[] = [];
    const fill = this.firstSolidPaint(node.fills);
    if (fill?.color) classes.push(this.colorToClass(fill.color, node.type === 'TEXT' ? 'text' : 'bg'));
    const stroke = this.firstSolidPaint(node.strokes);
    if (stroke?.color) classes.push('border', this.colorToClass(stroke.color, 'border'));
    const padding = node.padding;
    if (padding) {
      classes.push(this.paddingClass('x', Math.max(padding.left || 0, padding.right || 0)));
      classes.push(this.paddingClass('y', Math.max(padding.top || 0, padding.bottom || 0)));
    }
    if (node.effects?.some((effect) => effect.visible !== false && effect.type.includes('SHADOW'))) classes.push('shadow-lg');
    return classes.filter(Boolean).join(' ');
  }

  getTextClasses(node: FigmaNode): string {
    if (node.type !== 'TEXT') return '';
    const fontSize = node.style?.fontSize || 16;
    const weight = node.style?.fontWeight || 400;
    const classes = [fontSize >= 48 ? 'text-5xl' : fontSize >= 32 ? 'text-3xl' : fontSize >= 24 ? 'text-2xl' : fontSize >= 18 ? 'text-lg' : 'text-base'];
    if (weight >= 700) classes.push('font-bold'); else if (weight >= 600) classes.push('font-semibold');
    if ((node.style?.letterSpacing || 0) > 0) classes.push('tracking-wide');
    if (node.style?.textAlignHorizontal === 'CENTER') classes.push('text-center');
    return classes.join(' ');
  }

  rgbToHex(color: FigmaColor): string {
    const toHex = (channel: number) => Math.round(channel <= 1 ? channel * 255 : channel).toString(16).padStart(2, '0');
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
  }

  private firstSolidPaint(paints: FigmaPaint[] | undefined) { return paints?.find((paint) => paint.type === 'SOLID' && paint.visible !== false); }
  private colorToClass(color: FigmaColor, prefix: 'bg' | 'text' | 'border') { const hex = this.rgbToHex(color); const known = tokenColors[hex]; return known ? known.replace(/^(bg|text)/, prefix) : `${prefix}-[${hex}]`; }
  private paddingClass(axis: 'x' | 'y', amount: number) { if (amount >= 24) return `p${axis}-6`; if (amount >= 16) return `p${axis}-4`; if (amount >= 12) return `p${axis}-3`; if (amount >= 8) return `p${axis}-2`; return ''; }
}
