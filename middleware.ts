import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
/**
 * Middleware function to handle URL rewriting based on the request's hostname.
 * 
 * This middleware dynamically rewrites incoming requests to ensure that 
 * content is served according to the domain (hostname) being accessed.
 * 
 * - For local development, it redirects requests to a default location.
 * - For production, it matches the domain to a location and rewrites the URL 
 *   accordingly.
 *
 * @param {NextRequest} request 
 * @returns {NextResponse} 
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const { pathname } = request.nextUrl;
  
  const isLocal =
    hostname?.includes('localhost') || hostname?.includes('127.0.0.1'); 
  
  let nextResponse;
  
  const locationsList = process.env.NEXT_PUBLIC_PRODUCT_LIST
    ? JSON.parse(process.env.NEXT_PUBLIC_PRODUCT_LIST)
    : [];
  
  if (isLocal) {
    nextResponse = NextResponse.rewrite(
      new URL(
        `/${process.env.DEFAULT_PRODUCT}${pathname}`,
        request.url
      )
    );
  } else {
    // Loop through the list of locations to find a matching domain
    for (const location of locationsList) {
      if (hostname == location.domain) {
        // Rewrite the URL to the corresponding location's content
        nextResponse = NextResponse.rewrite(
          new URL(`/${location.location}${pathname}`, request.url)
        );
        break; // Exit the loop once a match is found
      }
    }
  }
  // Return the response with the rewritten URL
  return nextResponse;
}
/**
 * Configuration object for the middleware.
 *
 * Specifies the paths that should be handled by the middleware. The matcher 
 * excludes certain paths (e.g., Next.js internals, static files, favicon) 
 * to avoid unnecessary processing.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js internals like static files and scripts)
     * - static (static assets like images or stylesheets)
     * - favicon.ico (the site's favicon)
     * - Files with extensions (e.g., .js, .css, .png)
     */
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};