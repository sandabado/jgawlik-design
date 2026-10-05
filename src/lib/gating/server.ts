import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hasPreviewKey, isPublicGateEnabled, PREVIEW_COOKIE, PRIVATE_HEADERS } from './config';
import { isPortfolioMode } from '@/lib/portfolio-access/session';
import { requirePortfolioSession } from '@/lib/portfolio-access/server';

export async function hasPublicAccess(): Promise<boolean> {
  // Reviewer sessions do not grant access to the retained legacy surface.
  if (isPortfolioMode()) return false;
  if (!isPublicGateEnabled()) return true;
  return hasPreviewKey((await cookies()).get(PREVIEW_COOKIE)?.value);
}

// Page/API guards also enforce the policy if a request reaches a route without
// middleware (for example, through a framework-internal request path).
export async function requirePublicAccess(): Promise<void> {
  if (!await hasPublicAccess()) redirect(isPortfolioMode() ? '/portfolio-access' : '/coming-soon');
}

export async function requireResumeAccess(): Promise<void> {
  if (isPortfolioMode()) await requirePortfolioSession();
  else await requirePublicAccess();
}

export function unavailableResponse(): Response {
  return Response.json({ error: 'Temporarily unavailable.' }, { status: 503, headers: PRIVATE_HEADERS });
}
