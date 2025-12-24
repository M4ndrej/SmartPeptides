import moment from "moment";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const redirectPrefixes = ["/profile/", "/sign-in/"];

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;

  const redirectPages = redirectPrefixes.includes(pathname);
  if (redirectPages) {
    const loggedUser = request.cookies.get("loggedUser");
    let isUserLoggedIn = false;
    if (loggedUser) {
      const user = JSON.parse(loggedUser.value);
      const cookieExpiration = user.cookie.split("|");
      if (moment(+`${cookieExpiration[1]}000`).isAfter()) {
        isUserLoggedIn = true;
      }
    }

    switch (pathname) {
      case "/sign-in/":
        if (isUserLoggedIn)
          return NextResponse.redirect(new URL("/", request.url), {
            status: 301,
          });
        break;
      case "/profile/":
        if (!isUserLoggedIn)
          return NextResponse.redirect(new URL("/sign-in/", request.url), {
            status: 301,
          });
        break;
    }
  }

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  return response;
}
