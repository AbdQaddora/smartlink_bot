import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

/**
 * Simple demo auth gate: unauthenticated visitors are sent to /login,
 * and an already-logged-in visitor hitting /login is bounced to the app.
 */
export function proxy(req: NextRequest) {
  const isAuthed = req.cookies.get(AUTH_COOKIE)?.value === "1";
  const isLogin = req.nextUrl.pathname === "/login";

  if (!isAuthed && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuthed && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
