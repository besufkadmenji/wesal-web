import ar from "@/config/i18n/locales/ar.json";
import en from "@/config/i18n/locales/en.json";
import {
  isNetworkErrorMessage,
  localizeNetworkError,
} from "@/utils/network-error";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { afterEach, describe, expect, it, vi } from "vitest";

const atPath = (path: string) => window.history.replaceState(null, "", path);

describe("network errors (QA: 'Failed to fetch' on the Arabic site)", () => {
  afterEach(() => {
    atPath("/");
    vi.restoreAllMocks();
  });

  it.each([
    "Failed to fetch",
    "Load failed",
    "NetworkError when attempting to fetch resource.",
    "Network request failed",
    "TypeError: fetch failed",
  ])("recognizes the browser text %s", (message) => {
    expect(isNetworkErrorMessage(message)).toBe(true);
  });

  it("shows the page's language, not the browser's English text", () => {
    atPath("/ar/listings/1");
    expect(localizeNetworkError("Failed to fetch")).toBe(
      ar.common.networkError,
    );
    atPath("/en/listings/1");
    expect(localizeNetworkError("Load failed")).toBe(en.common.networkError);
  });

  it("leaves real API messages alone", () => {
    atPath("/ar");
    expect(localizeNetworkError("هذه المحادثة مغلقة")).toBe(
      "هذه المحادثة مغلقة",
    );
  });

  it("localizes Apollo network errors, wrapped or thrown directly", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    atPath("/ar");
    expect(
      parseGraphQLError({ networkError: new TypeError("Failed to fetch") }),
    ).toBe(ar.common.networkError);
    expect(parseGraphQLError(new TypeError("Failed to fetch"))).toBe(
      ar.common.networkError,
    );
  });
});
