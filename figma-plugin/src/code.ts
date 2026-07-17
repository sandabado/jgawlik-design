// Build this entry with a Figma plugin bundler (for example esbuild) before importing it into Figma.
// The orchestration URL is deliberately configurable: production should use an authenticated HTTPS endpoint.
const ORCHESTRATOR_URL = 'http://localhost:3000/api/design-system/translate';

type PluginMessage = { type: 'export-component'; url?: string } | { type: 'close' };

function serializeNode(node: SceneNode): Record<string, unknown> {
  const base = node as SceneNode & { layoutMode?: string; primaryAxisAlignItems?: string; counterAxisAlignItems?: string; paddingTop?: number; paddingRight?: number; paddingBottom?: number; paddingLeft?: number; fills?: unknown; strokes?: unknown; effects?: unknown; style?: unknown; characters?: string; children?: readonly SceneNode[]; };
  return { id: node.id, name: node.name, type: node.type, fills: base.fills || [], strokes: base.strokes || [], effects: base.effects || [], layoutMode: base.layoutMode || 'NONE', primaryAxisAlignItems: base.primaryAxisAlignItems, counterAxisAlignItems: base.counterAxisAlignItems, padding: { top: base.paddingTop, right: base.paddingRight, bottom: base.paddingBottom, left: base.paddingLeft }, absoluteBoundingBox: node.absoluteBoundingBox ? { width: node.absoluteBoundingBox.width, height: node.absoluteBoundingBox.height } : undefined, style: base.style, characters: base.characters, children: 'children' in base ? base.children?.map(serializeNode) : undefined };
}

figma.showUI(__html__, { width: 360, height: 420, title: 'Agentic Design System' });
figma.ui.onmessage = async (message: PluginMessage) => {
  if (message.type === 'close') { figma.closePlugin(); return; }
  const selected = figma.currentPage.selection[0];
  if (!selected) { figma.ui.postMessage({ type: 'error', message: 'Select one Figma component, frame, or layer first.' }); return; }
  try {
    const response = await fetch(message.url || ORCHESTRATOR_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ node: serializeNode(selected) }) });
    if (!response.ok) throw new Error(`Translation request failed (${response.status}).`);
    figma.ui.postMessage({ type: 'translated', payload: await response.json() });
  } catch (error) { figma.ui.postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Could not contact the translation service.' }); }
};
