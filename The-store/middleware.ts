
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  let cookies = req.cookies.get('token');
  console.log("Middleware cookies:", cookies);

  if (!cookies) {
    const loginURL = req.nextUrl.clone();
    loginURL.pathname = '/login';


    return NextResponse.redirect(loginURL);
  }


  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|login|register).*)"],
};
