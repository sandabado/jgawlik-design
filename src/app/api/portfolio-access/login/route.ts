import { NextResponse } from 'next/server';
import { verifyPortfolioPassword } from '@/lib/portfolio-access/password';
import { consumePortfolioAttempt } from '@/lib/portfolio-access/rate-limit';
import { isSameOriginPost, PORTFOLIO_PRIVATE_HEADERS, readPortfolioPassword } from '@/lib/portfolio-access/request';
import { createPortfolioSession, isPortfolioMode, PORTFOLIO_COOKIE, portfolioAccessConfiguration, portfolioCookieOptions } from '@/lib/portfolio-access/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function failure(status: number, retryAfter?: number): NextResponse {
  const headers: Record<string, string> = { ...PORTFOLIO_PRIVATE_HEADERS };
  if (retryAfter) headers['Retry-After'] = String(retryAfter);
  return new NextResponse('Unable to grant access. Please try again.', { status, headers });
}

export async function POST(request: Request) {
  if (!isPortfolioMode()) return failure(404);
  if (!isSameOriginPost(request)) return failure(403);
  if (!portfolioAccessConfiguration()) return failure(503);
  try {
    const limit = await consumePortfolioAttempt(request);
    if (!limit.allowed) return failure(429, limit.retryAfter);
    const password = await readPortfolioPassword(request);
    if (!password || !await verifyPortfolioPassword(password)) {
      return new NextResponse(null, { status: 303, headers: { ...PORTFOLIO_PRIVATE_HEADERS, Location: '/portfolio-access?error=1' } });
    }
    const response = new NextResponse(null, { status: 303, headers: { ...PORTFOLIO_PRIVATE_HEADERS, Location: '/portfolio' } });
    response.cookies.set(PORTFOLIO_COOKIE, createPortfolioSession(), portfolioCookieOptions());
    return response;
  } catch { return failure(503); }
}
