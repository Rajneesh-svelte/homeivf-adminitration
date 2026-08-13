import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_ROUTES = [
  '/',
  '/login',
  '/art-treatment',
  '/certificate',
  '/doctor-change',
  '/doctor-create',
  '/onboard-counsellor',
  '/roaster-form',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';
  const isValidRoute = VALID_ROUTES.includes(pathname);

  if (token) {
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isValidRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
