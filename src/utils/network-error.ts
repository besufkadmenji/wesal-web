import { getDictionary } from "@/config/i18n/dictionaries";
import { requestLanguage } from "@/utils/request-language";

// Texts browsers give a request that never reached the server (offline,
// server restarting, dropped connection): Chrome, Safari, Firefox, Node.
const NETWORK_ERROR_PATTERN =
  /failed to fetch|load failed|networkerror when attempting to fetch resource|network request failed|fetch failed/i;

/** True for the browser's own "couldn't connect" error text. */
export const isNetworkErrorMessage = (message: unknown): boolean =>
  typeof message === "string" && NETWORK_ERROR_PATTERN.test(message);

/** "Couldn't reach the server…" in the page's language. */
export const networkErrorText = (): string =>
  getDictionary(requestLanguage()).common.networkError;

/** Swaps a raw browser network error for the localized message. */
export const localizeNetworkError = (message: string): string =>
  isNetworkErrorMessage(message) ? networkErrorText() : message;
