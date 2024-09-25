import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const { pathname } = request.nextUrl;

  // Exclude Next.js internal paths from middleware processing
  if (
    pathname.startsWith("/_next") ||   // Exclude all Next.js static assets
    pathname.startsWith("/favicon.ico") || // Exclude favicon
    pathname.startsWith("/static")     // Exclude any other static paths, if applicable
  ) {
    return NextResponse.next();
  }

  const isLocal = hostname?.includes("localhost") || hostname?.includes("127.0.0.1");
  let nextResponse;

  const productList = process.env.NEXT_PUBLIC_PRODUCT_LIST
    ? JSON.parse(process.env.NEXT_PUBLIC_PRODUCT_LIST)
    : [];

  // Extract the path segments (excluding empty strings)
  const pathSegments = pathname.split("/").filter((segment) => segment.length > 0);

  // Check if the request is for TinaCMS admin panel or editing route
  if (pathname.startsWith("/admin") || pathname.startsWith("/admin/")) {
    // Allow TinaCMS admin paths to be handled without rewriting
    return NextResponse.next();
  }

  if (isLocal) {
    const isProduct = productList.some(
      (product: { product: string }) => product.product === pathSegments[0]
    );

    if (isProduct) {
      if (pathSegments.length === 1) {
        nextResponse = NextResponse.rewrite(new URL(`/${pathSegments[0]}`, request.url));
      } else if (pathSegments.length === 2) {
        nextResponse = NextResponse.rewrite(new URL(`/${pathSegments[0]}/${pathSegments[1]}`, request.url));
      }
    } else {
      nextResponse = NextResponse.rewrite(
        new URL(`/${process.env.DEFAULT_PRODUCT}${pathname}`, request.url)
      );
    }
  } else {
    for (const product of productList) {
      if (hostname === product.domain) {
        nextResponse = NextResponse.rewrite(
          new URL(`/${product.product}${pathname}`, request.url)
        );
        break;
      }
    }
  }

  return nextResponse || NextResponse.next();
}
