import { NextRequest, NextResponse } from 'next/server';
import { isPublicGateAsset } from '@/lib/gating/assets';
import { hasPreviewKey, isPublicGateEnabled, PREVIEW_COOKIE, PRIVATE_HEADERS } from '@/lib/gating/config';

function protect(response: NextResponse): NextResponse {
  for (const [name, value] of Object.entries(PRIVATE_HEADERS)) response.headers.set(name, value);
  response.headers.append('Vary', 'Cookie');
  return response;
}

export function middleware(request: NextRequest) {
  if (!isPublicGateEnabled()) return NextResponse.next();

  try {
    // Host and forwarded headers never select an ungated environment.
    if (hasPreviewKey(request.cookies.get(PREVIEW_COOKIE)?.value)) return protect(NextResponse.next());

    const pathname = decodeURIComponent(request.nextUrl.pathname);
    if (pathname === '/robots.txt' || pathname === '/favicon.ico') return protect(NextResponse.next());
    if (pathname === '/coming-soon' || pathname === '/coming-soon/') return protect(NextResponse.next());

    if (pathname.startsWith('/_next/static/')) {
      return isPublicGateAsset(pathname)
        ? protect(NextResponse.next())
        : protect(new NextResponse('Not found.', { status: 404 }));
    }
    if (pathname === '/_next/webpack-hmr' && process.env.NODE_ENV === 'development') return protect(NextResponse.next());

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return protect(NextResponse.json({ error: 'Temporarily unavailable.' }, { status: 503 }));
    }

    const destination = request.nextUrl.clone();
    destination.pathname = '/coming-soon';
    destination.search = '';
    // HTTP 200 + noindex is deliberate: crawlers can read the removal signal.
    return protect(NextResponse.rewrite(destination));
  } catch {
    return protect(new NextResponse('Temporarily unavailable.', { status: 503 }));
  }
}

export const config = { matcher: '/:path*', runtime: 'nodejs' };
