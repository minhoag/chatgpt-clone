import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = '';
    if (request.nextUrl.pathname.startsWith('/chat') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*'],
};