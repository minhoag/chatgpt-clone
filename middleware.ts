import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isChatPage = request.nextUrl.pathname.startsWith("/chat");

  if (!token && !isAuthPage && isChatPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isChatPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat"],
};
