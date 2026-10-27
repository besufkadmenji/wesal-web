import Cookies from "js-cookie";
import { afterEach, describe, expect, it } from "vitest";
import { requestLanguage } from "./request-language";

/** An English page sent Arabic to the API when no `lang` cookie was set. */
describe("requestLanguage", () => {
  afterEach(() => {
    Cookies.remove("lang");
    window.history.pushState({}, "", "/");
  });

  it("follows the page's locale even without a cookie", () => {
    window.history.pushState({}, "", "/en/auth/forgot-password");
    expect(requestLanguage()).toBe("en");
  });

  it("prefers the page's locale over a stale cookie", () => {
    Cookies.set("lang", "ar");
    window.history.pushState({}, "", "/en/listings");
    expect(requestLanguage()).toBe("en");
  });

  it("falls back to the cookie, then Arabic, off locale paths", () => {
    window.history.pushState({}, "", "/api/proxy/graphql");
    expect(requestLanguage()).toBe("ar");
    Cookies.set("lang", "en");
    expect(requestLanguage()).toBe("en");
  });
});
