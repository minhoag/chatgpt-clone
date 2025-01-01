import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPage: boolean = request.nextUrl.pathname.startsWith("/auth");
  const isChatPage: boolean = request.nextUrl.pathname.startsWith("/chat");
  const isLoginPage: boolean = request.nextUrl.pathname.startsWith("/login");

  if (!token && !isAuthPage && isChatPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && isChatPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/auth/:path*", "/login"],
};
