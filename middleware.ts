import { NextRequest, NextResponse } from 'next/server';
import { isUserLoggedIn } from '@/lib/utils'

export function middleware(request: NextRequest, response: NextResponse) {
    const token = request.cookies.get('jwt')?.value;
    const isAuthenticated = isUserLoggedIn(token);
    if (request.nextUrl.pathname.startsWith('/chat') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*'],
}