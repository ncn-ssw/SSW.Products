import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  // Define your domain-to-site mapping
  const domainMap: Record<string, string> = {
    'tenant1.yakshaver.ai': 'tenant1',
    'tenant2.yakshaver.ai': 'tenant2',
  };

  // Determine the site based on the hostname
  const site = domainMap[hostname || ''];

  // If the site is not found in the domain map, continue to the default
  if (!site) {
    return NextResponse.next();
  }

  // Rewrite to the dynamic [filename] path with the site as a query parameter
  const rewriteUrl = new URL(request.url);
  rewriteUrl.searchParams.set('site', site);

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
