// // src/middleware.ts
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

//   if (isAuthPage) {
//     if (token) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   // Role-based routing
//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     const userRole = token.role as string;
//     const path = request.nextUrl.pathname;

//     if (path === "/dashboard") {
//       return NextResponse.redirect(
//         new URL(`/dashboard/${userRole.toLowerCase()}`, request.url)
//       );
//     }

//     if (!path.includes(userRole.toLowerCase())) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };

// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect admin routes
    if (path.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect vendor routes
    if (path.startsWith("/dashboard/vendor") && token?.role !== "VENDOR") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect evaluator routes
    if (
      path.startsWith("/dashboard/evaluator") &&
      token?.role !== "EVALUATOR"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tenders/:path*",
    "/bids/:path*",
    "/users/:path*",
    "/profile/:path*",
  ],
};
