import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (request.cookies.get("token") != undefined) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.get("token") != undefined) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
