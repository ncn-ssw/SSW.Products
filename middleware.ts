import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const { pathname } = request.nextUrl;

  // Define the domain-to-site mapping
  const domainMap: Record<string, string> = {
    'www.yakshaver.ai': 'yakshaver',
    'tenant1.yakshaver.ai': 'yakshaver',
    'tenant2.yakshaver.ai': 'timepro',
    // 'yakshaver.ai': 'yakshaver',
    'www.timepro.com': 'timepro',
    // 'timepro.com': 'timepro',
  };

  
  const site = domainMap[hostname || ''];

  
  if (!site) {
    return NextResponse.next();
  }

  
  const rewriteUrl = new URL(request.url);
  rewriteUrl.searchParams.set('site', site);

  
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
