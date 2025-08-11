import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  const isPublic =
    pathname === "/login" ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/healthz") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/api/"); // let API calls pass through to proxy

  if (isPublic) return NextResponse.next();

  // SSR/edge auth gate: require presence of JWT cookie mirrored at login
  const hasJwt = Boolean(req.cookies.get("jwt_token")?.value);
  if (!hasJwt) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Protect everything except API, Next assets, favicon, login and invite pages
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|login|invite|healthz).*)",
  ],
};


