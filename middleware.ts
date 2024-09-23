import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  // Define the mapping for tenant domains to tenant names
  const domainMap: Record<string, string> = {
    'tenant1.yakshaver.ai': 'tenant1',
    'tenant2.yakshaver.ai': 'tenant2',
  };

  // Determine the tenant based on the hostname
  const tenant = domainMap[hostname || ''];

  if (tenant) {
    // Rewrite to the dynamic [filename] path
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = `/${tenant}`; // This should map to [filename]
    return NextResponse.rewrite(rewriteUrl);
  }

  // Default handling if no tenant matches
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
