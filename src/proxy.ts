import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "./config/i18n/settings";
acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)",
  ],
};

function getLocale(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";
  if (req.cookies.has("lng")) return req.cookies.get("lng")?.value;
  return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
}

const preAuthPaths = (locale: string) => [
  `/${locale}/auth`,
  `/${locale}/auth/verify-account`,
  `/${locale}/auth/registration-success`,
  `/${locale}`,
];

const publicPaths = (locale: string) => [`/${locale}/terms-and-conditions`];
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentLocale = getLocale(request);
  const pathnameHasLocale =
    pathname.startsWith(`/${currentLocale}/`) ||
    pathname === `/${currentLocale}`;

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(
        `/${currentLocale}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  const isPublicPath = publicPaths(currentLocale ?? "ar").some(
    (path) => pathname === path
  );
  if (isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
