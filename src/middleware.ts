import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const publicPaths = ["/signIn", "/signUp"];
  const isPublicPath =
    publicPaths.some((path) => pathname.startsWith(path)) || pathname === "/";

  const protectedPaths = ["/dashboard", "/add-product"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (token) {
    if (isPublicPath) {
      // ...redirect them to their dashboard.
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    // ...and they try to access a protected page...
    if (isProtectedPath) {
      // ...redirect them to the sign-in page.
      // We add a callbackUrl so they are sent back to the page they
      // originally wanted to visit after they log in.
      return NextResponse.redirect(
        new URL(`/signIn?callbackUrl=${pathname}`, req.url),
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
