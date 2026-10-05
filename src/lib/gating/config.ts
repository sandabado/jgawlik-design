import { createHash, timingSafeEqual } from 'node:crypto';

export const PREVIEW_COOKIE = 'preview_key';

// Missing or malformed flags keep the public gate closed. Only an explicit
// false lifts it; no development-mode exemption changes the access policy.
export function isPublicGateEnabled(): boolean {
  return process.env.PUBLIC_GATE !== 'false';
}

export function hasPreviewKey(value: string | undefined): boolean {
  const secret = process.env.PREVIEW_BYPASS_SECRET;
  if (!secret || !/^[A-Za-z0-9_-]{43,128}$/.test(secret) || !value || value.length > 128) return false;
  const digest = (input: string) => createHash('sha256').update(input).digest();
  return timingSafeEqual(digest(value), digest(secret));
}

export const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
};
