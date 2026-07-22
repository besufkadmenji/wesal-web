import { describe, expect, it } from "vitest";
import { buildProxyRequestHeaders } from "./proxy.request.headers";

describe("buildProxyRequestHeaders", () => {
  it("turns the session token cookie value into a Bearer header", () => {
    const headers = buildProxyRequestHeaders(
      new Headers({ "content-type": "multipart/form-data" }),
      "customer-token",
    );

    expect(headers.get("authorization")).toBe("Bearer customer-token");
  });

  it("preserves an explicit Authorization header", () => {
    const headers = buildProxyRequestHeaders(
      new Headers({ authorization: "Bearer explicit-token" }),
      "cookie-token",
    );

    expect(headers.get("authorization")).toBe("Bearer explicit-token");
  });

  it("does not forward browser cookies or synthesize empty credentials", () => {
    const headers = buildProxyRequestHeaders(
      new Headers({ cookie: "token=secret; lang=en", host: "localhost:3000" }),
      " ",
    );

    expect(headers.has("authorization")).toBe(false);
    expect(headers.has("cookie")).toBe(false);
    expect(headers.has("host")).toBe(false);
  });
});
