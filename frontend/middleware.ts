import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;

  /**
   * Ignorar assets internos do Next
   */
  const isPublicAsset =
    pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico");

  if (isPublicAsset) {
    return NextResponse.next();
  }

  const isPublicPage = PUBLIC_PATHS.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  /**
   * 1. NÃO AUTENTICADO → bloqueia dashboard
   */
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /**
   * 2. AUTENTICADO → não pode acessar login
   */
  if (token && isPublicPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
