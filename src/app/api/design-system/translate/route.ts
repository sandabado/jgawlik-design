import { FigmaTranslator } from '@/lib/design-system/figma-translator';
import type { FigmaNode } from '@/lib/design-system/types';
import { validateFigmaNode } from '@/lib/design-system/validator';

function isFigmaNode(value: unknown): value is FigmaNode { return Boolean(value && typeof value === 'object' && 'id' in value && 'name' in value && 'type' in value); }

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const node = typeof body === 'object' && body !== null && 'node' in body ? body.node : undefined;
  if (!isFigmaNode(node)) return Response.json({ error: 'A valid Figma node is required.' }, { status: 400 });
  const translator = new FigmaTranslator();
  return Response.json({ component: translator.translate(node), issues: validateFigmaNode(node) });
}
