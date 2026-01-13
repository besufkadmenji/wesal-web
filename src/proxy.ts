import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "./config/i18n/settings";
import { ME_QUERY } from "./graphql/user/me";
import client from "./utils/apollo.client";
import { UserRole } from "./gql/graphql";
acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|videos|assets|favicon.ico|sw.js).*)",
  ],
};

function getLocale(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";
  if (req.cookies.has("lang")) return req.cookies.get("lang")?.value;
  return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
}

const preAuthPaths = (locale: string) => [
  `/${locale}/auth`,
  `/${locale}/auth/choose-type`,
  `/${locale}/auth/forgot-password`,
  `/${locale}/auth/forgot-password/verify`,
  `/${locale}/auth/reset-password`,
  `/${locale}/auth/login`,
  `/${locale}/auth/register`,
  `/${locale}/auth/register/verify`,
  `/${locale}`,
  "/",
];

const publicPaths = (locale: string) => [
  `/${locale}/support/terms`,
  `/${locale}/support/privacy-policy`,
  `/${locale}/support/about-us`,
  `/${locale}/support/contact-us`,
  `/${locale}/support/faq`,
];
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
        request.url,
      ),
    );
  }

  const isPublicPath = publicPaths(currentLocale ?? "ar").some(
    (path) => pathname === path,
  );
  if (isPublicPath) {
    return NextResponse.next();
  }

  const isPreAuthPath = preAuthPaths(currentLocale ?? "ar").some(
    (path) => pathname === path,
  );

  const isLoggedIn = await getUser(request);
  console.log("isLoggedIn", isLoggedIn);
  if (!isLoggedIn) {
    if (!isPreAuthPath) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/auth?action=login`, request.url),
      );
    }
  }
  if (
    isLoggedIn &&
    isLoggedIn.role === UserRole.Provider &&
    !isLoggedIn.signedContract &&
    !pathname.startsWith(`/${currentLocale}/profile/signed-contract`)
  ) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/profile/signed-contract`, request.url),
    );
  }

  return NextResponse.next();
}

const getUser = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const meResult = await client(
      token,
      `${process.env.API_BASE_URL}/graphql`,
    ).query({
      query: ME_QUERY,
    });

    return meResult.data?.me ?? null;
  } catch (e) {}
  return null;
};
