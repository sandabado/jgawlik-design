import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hasPreviewKey, isPublicGateEnabled, PREVIEW_COOKIE, PRIVATE_HEADERS } from './config';

export async function hasPublicAccess(): Promise<boolean> {
  if (!isPublicGateEnabled()) return true;
  return hasPreviewKey((await cookies()).get(PREVIEW_COOKIE)?.value);
}

// Page/API guards also enforce the policy if a request reaches a route without
// middleware (for example, through a framework-internal request path).
export async function requirePublicAccess(): Promise<void> {
  if (!await hasPublicAccess()) redirect('/coming-soon');
}

export function unavailableResponse(): Response {
  return Response.json({ error: 'Temporarily unavailable.' }, { status: 503, headers: PRIVATE_HEADERS });
}
