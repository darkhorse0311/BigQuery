import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(session, '==========session=======')
  console.log(path, '==========path=======')
  if (!session && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path.includes("login") || path.includes("register"))) {
    console.log('==========protected=======')
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}
