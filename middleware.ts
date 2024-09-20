// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');
  const url = req.nextUrl;

  console.log('Running in:', process.env.NODE_ENV);
  const isDevelopment = process.env.NODE_ENV === 'development';

  let tenant = null;

  if (url.pathname === '/yakshaver') {
    tenant = 'yakshaver';
  } else if (url.pathname === '/timepro') {
    tenant = 'timepro';
  }

  if (isDevelopment) {
    console.log('Local development environment detected.');
    console.log('tenant', tenant);
    console.log('url.pathname is: ', url.pathname);
  }

  if (tenant) {
    return NextResponse.rewrite(new URL(`/${tenant}`, req.url));
  }
  return NextResponse.redirect('https://www.ssw.com.au/404');
}
