import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const authUrls = ['/login', '/register'];

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const { pathname } = nextUrl;
    const { token } = nextauth;

    if (!token && !authUrls.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (pathname.startsWith('/api') && !token) {
      return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) =>
        !!token || req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.startsWith('/login'),
    },
  },
);

export const config = { matcher: ['/dashboard'] };
