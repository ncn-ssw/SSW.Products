import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  
  const domainMap: Record<string, string> = {
    'tenant1.yakshaver.ai': 'tenant1',
    'tenant2.yakshaver.ai': 'tenant2',
  };

  
  const tenant = domainMap[hostname || ''];

  if (tenant) {
  
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = `/${tenant}`; 
    return NextResponse.rewrite(rewriteUrl);
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
