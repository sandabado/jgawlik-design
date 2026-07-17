import Link from 'next/link';
import Badge from '@/components/design-system/Badge';
import Button from '@/components/design-system/Button';
import Card from '@/components/design-system/Card';
import Input from '@/components/design-system/Input';
import Section from '@/components/design-system/Section';

export const metadata = { title: 'Jesse Gawlik — Agentic Design System' };

export default function DesignSystemPage() {
  return <main className="design-system-page"><header><Link href="/">← PORTFOLIO</Link><p>JESSE.GAWLIK.DEV / AGENTIC DESIGN SYSTEM</p><h1>One source of truth.<br /><em>Many expressions.</em></h1><span>Figma → translation layer → validated production code</span></header><Section eyebrow="CORE PRIMITIVES" title="The first five components."><div className="ds-demo-grid"><Card><Badge>DEFAULT</Badge><h3>Card</h3><p>A contained surface for a decision, object, or system state.</p><Button>Continue →</Button></Card><Card><Badge>INPUT</Badge><Input label="Email address" placeholder="name@company.com" /><Button variant="secondary">Submit</Button></Card><Card><Badge>VARIANTS</Badge><div className="ds-button-stack"><Button size="sm">Small</Button><Button>Medium</Button><Button size="lg">Large</Button></div></Card></div></Section><Section eyebrow="TRANSLATION API" title="Figma component JSON in. Typed React source out."><Card><p className="ds-code">POST /api/design-system/translate</p><p>The endpoint maps visual tokens, auto-layout, typography, and basic accessibility signals into a reviewable component source file.</p></Card></Section><footer>v0.1 / Tokens, primitives, Figma translation and validation scaffolding</footer></main>;
}
