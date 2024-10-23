import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (['/manifest.json', '/favicon.ico'].includes(pathname)) return;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\.).*)',
  ],
};
