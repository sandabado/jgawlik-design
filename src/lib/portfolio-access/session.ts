import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const PORTFOLIO_COOKIE = 'portfolio_session';
export const PORTFOLIO_SESSION_SECONDS = 8 * 60 * 60;
export const PORTFOLIO_HASH_PATTERN = /^scrypt:32768:8:3:[A-Za-z0-9_-]{22}:[A-Za-z0-9_-]{43}$/;

export function isPortfolioMode(): boolean {
  return process.env.PORTFOLIO_MODE === 'true';
}

export function portfolioAccessConfiguration(): { hash: string; secret: string } | undefined {
  const hash = process.env.PORTFOLIO_ACCESS_HASH;
  const secret = process.env.PORTFOLIO_SESSION_SECRET;
  if (!hash || !PORTFOLIO_HASH_PATTERN.test(hash) || !secret || !/^[A-Za-z0-9_-]{43,128}$/.test(secret)) return undefined;
  // Reject non-canonical encodings instead of silently accepting truncated bytes.
  const fields = hash.split(':');
  if (Buffer.from(fields[4], 'base64url').toString('base64url') !== fields[4]) return undefined;
  if (Buffer.from(fields[5], 'base64url').toString('base64url') !== fields[5]) return undefined;
  return { hash, secret };
}

function sign(body: string, configuration: { hash: string; secret: string }): Buffer {
  // Password or session-secret rotation revokes every previously issued cookie.
  return createHmac('sha256', configuration.secret)
    .update(`portfolio-session:v1\0${configuration.hash}\0${body}`)
    .digest();
}

export function createPortfolioSession(now = Date.now()): string {
  const configuration = portfolioAccessConfiguration();
  if (!isPortfolioMode() || !configuration) throw new Error('Portfolio access is unavailable.');
  const issued = Math.floor(now / 1000);
  const expires = issued + PORTFOLIO_SESSION_SECONDS;
  const body = `1.${issued.toString(36)}.${expires.toString(36)}.${randomBytes(16).toString('base64url')}`;
  return `${body}.${sign(body, configuration).toString('base64url')}`;
}

/** No framework/server-only imports: also usable by Node.js middleware. */
export function hasPortfolioSession(value: string | undefined, now = Date.now()): boolean {
  const configuration = portfolioAccessConfiguration();
  if (!isPortfolioMode() || !configuration || !value || value.length > 192) return false;
  const fields = value.split('.');
  if (fields.length !== 5 || fields[0] !== '1' || !/^[0-9a-z]{1,12}$/.test(fields[1]) || !/^[0-9a-z]{1,12}$/.test(fields[2]) || !/^[A-Za-z0-9_-]{22}$/.test(fields[3]) || !/^[A-Za-z0-9_-]{43}$/.test(fields[4])) return false;
  const issued = Number.parseInt(fields[1], 36);
  const expires = Number.parseInt(fields[2], 36);
  const seconds = Math.floor(now / 1000);
  if (!Number.isSafeInteger(issued) || !Number.isSafeInteger(expires) || issued > seconds || expires <= seconds || expires - issued !== PORTFOLIO_SESSION_SECONDS) return false;
  const signature = Buffer.from(fields[4], 'base64url');
  if (signature.length !== 32 || signature.toString('base64url') !== fields[4]) return false;
  return timingSafeEqual(signature, sign(fields.slice(0, 4).join('.'), configuration));
}

export function portfolioCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.VERCEL === '1' || process.env.NODE_ENV !== 'development',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: PORTFOLIO_SESSION_SECONDS,
  };
}
