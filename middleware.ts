// // middleware.js

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyToken } from './app/utils/jwtUtils';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('authToken')?.value;

//   // List of routes accessible to users without authentication
//   const publicRoutes = ['/', '/register', '/forgot-password', '/reset-password'];

//   // List of routes accessible to authenticated users
//   const privateRoutes = ['/'];

//   // If the requested route is a public route, allow access
//   if (publicRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//  // If the user is not authenticated and the route is not public, redirect to login
//  if (!token && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/reset-password') {
//   return NextResponse.redirect(new URL('/login', request.url));
// }

//   // If the user is authenticated and the route is a private route, allow access
//   if (token && privateRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   // If the user is authenticated but the route is not private, redirect to dashboard
//   if (token && request.nextUrl.pathname !== '/dashboard') {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // For any other scenario, allow access
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };





// /middleware.js

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // List of routes accessible to users without authentication
  const publicRoutes = [
    "/",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/forgot-password-email-sent",
  ];

  // List of routes accessible to authenticated users
  const privateRoutes = ["/", "/[username]"];

  // If the requested route is a public route or one of the special routes like /forgot-password or /reset-password, allow access
  if (
    publicRoutes.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/forgot-password") ||
    request.nextUrl.pathname.startsWith("/reset-password") ||
    request.nextUrl.pathname.startsWith("/forgot-password-email-sent")
  ) {
    return NextResponse.next();
  }

  // If the user is not authenticated and the route is not public or a special route, redirect to login
  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and the route is a private route, allow access
  if (token && privateRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If the user is authenticated but the route is not private, redirect to dashboard
  if (token && request.nextUrl.pathname !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For any other scenario, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
