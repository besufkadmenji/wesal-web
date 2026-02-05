import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "./config/i18n/settings";
import { Provider, User } from "./gql/graphql";
import { ME_PROVIDER_QUERY } from "./graphql/providers/meProvider";
import { ME_USER_QUERY } from "./graphql/user/meUser";
import client from "./utils/apollo.client";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|videos|assets|favicon.ico|sw.js).*)",
  ],
};

/* -------------------------------------------------------------------------- */
/*                                   Locale                                   */
/* -------------------------------------------------------------------------- */

function getLocale(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.cookies.has("lang")) {
    return req.cookies.get("lang")?.value;
  }

  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";

  return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
}

/* -------------------------------------------------------------------------- */
/*                                   Paths                                    */
/* -------------------------------------------------------------------------- */

const preAuthPaths = (locale: string) => [
  `/${locale}`,
  "/",
  `/${locale}/auth`,
  `/${locale}/auth/choose-type`,
  `/${locale}/auth/forgot-password`,
  `/${locale}/auth/forgot-password/verify`,
  `/${locale}/auth/reset-password`,
  `/${locale}/auth/login`,
  `/${locale}/auth/register`,
  `/${locale}/auth/register/verify`,
];

const publicPaths = (locale: string) => [
  `/${locale}/support/terms`,
  `/${locale}/support/privacy-policy`,
  `/${locale}/support/about-us`,
  `/${locale}/support/contact-us`,
  `/${locale}/support/faq`,
  `/${locale}/categories`,
  `/${locale}/listings`, // ⬅ listings index + subtree
];

/* -------------------------------------------------------------------------- */
/*                                   Proxy                                    */
/* -------------------------------------------------------------------------- */

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const currentLocale = getLocale(request);

  const pathnameHasLocale =
    pathname === `/${currentLocale}` ||
    pathname.startsWith(`/${currentLocale}/`);

  /* -------------------------- Force locale prefix -------------------------- */
  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}${pathname}${search}`, request.url),
    );
  }

  /* ------------------------------ Public paths ----------------------------- */
  const isPublicPath = publicPaths(currentLocale!).some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  /* ------------------------------ Pre-auth paths --------------------------- */
  const isPreAuthPath = preAuthPaths(currentLocale!).some(
    (path) => pathname === path,
  );

  /* ------------------------------ Auth check ------------------------------- */
  const result = await getUser(request);
  const isLoggedIn = Boolean(result?.user || result?.provider);

  if (!isLoggedIn && !isPreAuthPath) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/auth?action=login`, request.url),
    );
  }

  /* ----------------------- Provider contract enforcement ------------------- */
  if (
    result?.provider &&
    !result.provider.signedContract &&
    !pathname.startsWith(`/${currentLocale}/profile/signed-contract`)
  ) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/profile/signed-contract`, request.url),
    );
  }

  return NextResponse.next();
}

/* -------------------------------------------------------------------------- */
/*                                   User API                                 */
/* -------------------------------------------------------------------------- */

const getUser = async (
  req: NextRequest,
): Promise<{
  user?: User;
  provider?: Provider;
} | null> => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const apiUrl = `${process.env.API_BASE_URL}/graphql`;

    const [meUserResult, meProviderResult] = await Promise.all([
      client(token, apiUrl).query({ query: ME_USER_QUERY }),
      client(token, apiUrl).query({ query: ME_PROVIDER_QUERY }),
    ]);

    return {
      user: meUserResult.data?.meUser,
      provider: meProviderResult.data?.meProvider,
    };
  } catch {
    return null;
  }
};
