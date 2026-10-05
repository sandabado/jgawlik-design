import { NextResponse } from 'next/server';
import { isSameOriginPost, PORTFOLIO_PRIVATE_HEADERS } from '@/lib/portfolio-access/request';
import { isPortfolioMode, PORTFOLIO_COOKIE, portfolioCookieOptions } from '@/lib/portfolio-access/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isPortfolioMode()) return new NextResponse('Unable to grant access. Please try again.', { status: 404, headers: PORTFOLIO_PRIVATE_HEADERS });
  if (!isSameOriginPost(request)) return new NextResponse('Unable to grant access. Please try again.', { status: 403, headers: PORTFOLIO_PRIVATE_HEADERS });
  const response = new NextResponse(null, { status: 303, headers: { ...PORTFOLIO_PRIVATE_HEADERS, Location: '/portfolio-access' } });
  response.cookies.set(PORTFOLIO_COOKIE, '', { ...portfolioCookieOptions(), maxAge: 0 });
  return response;
}
