import { NextRequest, NextResponse } from 'next/server';
const VALID_ROUTES = [
  '/',
  '/login',
  '/art-treatment',
  '/category-create',
  '/certificate',
  '/doctor-change',
  '/doctor-create',
  '/onboard-counsellor',
  '/roaster-form',
] as const;

const NON_FUZZY_ROUTES = new Set(['/', '/login']);

const PREFIX_ROUTES = [...VALID_ROUTES]
  .filter((r) => !NON_FUZZY_ROUTES.has(r))
  .sort((a, b) => b.length - a.length);

const FUZZY_ROUTES = PREFIX_ROUTES.map((route) => ({
  route,
  maxDistance: Math.max(3, Math.floor(route.length * 0.4)),
}));

const VALID_ROUTE_SET = new Set<string>(VALID_ROUTES);

const IS_DEV = process.env.NODE_ENV !== 'production';

function levenshtein(a: string, b: string, maxDistance: number): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;
  if (Math.abs(aLen - bLen) > maxDistance) return maxDistance + 1;

  if (aLen > bLen) {
    [a, b] = [b, a];
  }

  const shortLen = a.length;
  const longLen = b.length;

  let prev = new Array<number>(shortLen + 1);
  let curr = new Array<number>(shortLen + 1);

  for (let i = 0; i <= shortLen; i++) prev[i] = i;

  for (let i = 1; i <= longLen; i++) {
    curr[0] = i;
    const bChar = b.charCodeAt(i - 1);
    let rowMin = curr[0];

    for (let j = 1; j <= shortLen; j++) {
      const cost = bChar === a.charCodeAt(j - 1) ? 0 : 1;
      const val = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      curr[j] = val;
      if (val < rowMin) rowMin = val;
    }

    if (rowMin > maxDistance) return maxDistance + 1;
    [prev, curr] = [curr, prev];
  }

  return prev[shortLen];
}

function findPrefixMatch(pathname: string): string | null {
  for (const route of PREFIX_ROUTES) {
    if (pathname.startsWith(route)) return route;
  }
  return null;
}

function findCanonicalRoute(pathname: string): string | null {
  if (VALID_ROUTE_SET.has(pathname)) return null;

  const prefix = findPrefixMatch(pathname);
  if (prefix) return prefix;

  let closest: string | null = null;
  let smallest = Infinity;

  for (const { route, maxDistance } of FUZZY_ROUTES) {
    if (Math.abs(pathname.length - route.length) > maxDistance) continue;

    const distance = levenshtein(pathname, route, maxDistance);
    if (distance < smallest) {
      smallest = distance;
      closest = route;
      if (distance === 1) break;
    }
  }

  if (!closest) return null;

  const threshold = Math.max(3, Math.floor(closest.length * 0.4));
  return smallest <= threshold ? closest : null;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  console.log('[MW] hit:', pathname);

  if (pathname === '/login') {
    return token ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next();
  }

  if (pathname.startsWith('/login/')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (VALID_ROUTE_SET.has(pathname)) {
    return NextResponse.next();
  }

  const canonical = findCanonicalRoute(pathname);
  if (canonical) {
    const redirectUrl = new URL(canonical, request.url);
    redirectUrl.search = search;

    if (IS_DEV) {
      console.log(`[Route Correction] ${pathname} → ${canonical}`);
    }

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};
