import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/login";

  const isPublicFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico");

  if (isPublicFile) {
    return NextResponse.next();
  }

  // sem login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // já logado
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};