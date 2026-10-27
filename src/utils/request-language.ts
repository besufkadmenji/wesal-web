import { fallbackLng, languages } from "@/config/i18n/settings";
import Cookies from "js-cookie";

/**
 * The language sent to the API (`accept-language`). The page's own locale
 * (`/en/…`, `/ar/…`) comes first: the `lang` cookie is only set when someone
 * uses the language menu, so a visitor who opened an `/en` page directly
 * used to get Arabic emails and messages from the API.
 */
export const requestLanguage = (): string => {
  if (typeof window === "undefined") return fallbackLng;
  const segment = window.location.pathname.split("/")[1];
  if (languages.includes(segment)) return segment;
  const cookie = Cookies.get("lang");
  return cookie && languages.includes(cookie) ? cookie : fallbackLng;
};
