import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;

  const isPublicFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api");

  if (isPublicFile) {
    return NextResponse.next();
  }

  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  /**
   * 1. NÃO LOGADO → só pode acessar páginas públicas
   */
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /**
   * 2. LOGADO → não pode acessar login
   */
  if (token && isPublicPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
