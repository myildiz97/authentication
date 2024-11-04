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

// export { default } from "next-auth/middleware"
// export const config = { matcher: ['/dashboard']}

// export { auth as middleware } from "auth"

// // Or like this if you need to do something here.
// // export default auth((req) => {
// //   console.log(req.auth) //  { session: { user: { ... } } }
// // })

// // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }