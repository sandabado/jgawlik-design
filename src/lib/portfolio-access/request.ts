import 'server-only';

export const PORTFOLIO_PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
};

export function isSameOriginPost(request: Request): boolean {
  if (request.method !== 'POST') return false;
  const origin = request.headers.get('origin');
  if (!origin || request.headers.get('sec-fetch-site') === 'cross-site') return false;
  try {
    const received = new URL(origin);
    if (received.origin !== origin || received.username || received.password) return false;
    // Requests without an Origin never pass; redirects stay relative and fixed.
    const target = new URL(request.url);
    const host = request.headers.get('host');
    // Next dev normalizes request.url to localhost, even for a loopback IP.
    // Host reflects the browser's actual target; forwarded headers never select it.
    if (host) {
      const authority = new URL(`${target.protocol}//${host}`);
      if (authority.host !== host.toLowerCase() || authority.username || authority.password || authority.pathname !== '/') return false;
      return received.origin === authority.origin;
    }
    return received.origin === target.origin;
  } catch { return false; }
}

export async function readPortfolioPassword(request: Request): Promise<string | undefined> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/x-www-form-urlencoded') return undefined;
  const declared = request.headers.get('content-length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > 4096)) return undefined;
  if (!request.body) return undefined;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 4096) { await reader.cancel(); return undefined; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const data = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
  const values = data.getAll('password');
  const password = values.length === 1 ? values[0] : undefined;
  return password && password.length <= 256 ? password : undefined;
}
