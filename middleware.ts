import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./auth";
import { Role } from "@prisma/client";

const protectedRoutes = ["/checkout", "/seller"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  const isSellerRoute = request.nextUrl.pathname.startsWith("/seller");

  const isSeller = session?.role === Role.Seller;

  if (!session && isProtected) {
    const signInUrl = new URL("/auth/sign-in", request.nextUrl);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    if (request.nextUrl.pathname !== "/auth/sign-in") {
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isSellerRoute && !isSeller) {
    const applyUrl = new URL("/seller/register", request.nextUrl);

    if (request.nextUrl.pathname !== "/seller/register") {
      return NextResponse.redirect(applyUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
