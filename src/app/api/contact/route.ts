import { hasPublicAccess, unavailableResponse } from '@/lib/gating/server';

export async function POST() {
  if (!await hasPublicAccess()) return unavailableResponse();
  return Response.json({ ok: true, message: 'Thanks for reaching out.' });
}
