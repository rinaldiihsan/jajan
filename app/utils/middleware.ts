import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const userRole = request.cookies.get('userRole');

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!accessToken || userRole?.value !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect user routes
  if (request.nextUrl.pathname.startsWith('/user')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
