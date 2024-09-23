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
 * @param {NextRequest} request - The incoming HTTP request object.
 * @returns {NextResponse} - The response object with the rewritten URL.
 */
export function middleware(request: NextRequest) {
  // Retrieve the hostname from the request headers
  const hostname = request.headers.get('host');
  
  // Extract the pathname from the requested URL (e.g., /about, /contact)
  const { pathname } = request.nextUrl;
  // Check if the request is coming from a local development environment
  const isLocal =
    hostname?.includes('localhost') || hostname?.includes('127.0.0.1'); 
  // Variable to store the response after applying the rewrite rules
  let nextResponse;
  // Retrieve the list of locations and corresponding domains from environment variables
  const locationsList = process.env.NEXT_PUBLIC_PRODUCT_LIST
    ? JSON.parse(process.env.NEXT_PUBLIC_PRODUCT_LIST)
    : [];
  // If running locally, rewrite the URL to include the default location
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