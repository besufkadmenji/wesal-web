import { beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/config/i18n/locales/en.json";
import { graphqlMultipartRequest } from "./graphql.multipart";

describe("graphqlMultipartRequest", () => {
  beforeEach(() => {
    document.cookie = "token=participant-token; path=/";
    document.cookie = "lang=en; path=/";
  });

  it("maps evidence files to GraphQL multipart variables", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ data: { createComplaint: { id: "c1" } } }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const file = new File(["proof"], "proof.png", { type: "image/png" });

    await expect(
      graphqlMultipartRequest<{ createComplaint: { id: string } }>({
        query: "mutation Create($evidence: [Upload!]) { ok }",
        variables: { evidence: [null] },
        files: [file],
        fileVariable: "evidence",
      }),
    ).resolves.toEqual({ createComplaint: { id: "c1" } });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const form = init.body as FormData;
    expect(JSON.parse(String(form.get("map")))).toEqual({
      "0": ["variables.evidence.0"],
    });
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer participant-token",
    );
  });

  const send = () =>
    graphqlMultipartRequest<{ ok: boolean }>({
      query: "mutation Create($evidence: [Upload!]) { ok }",
      variables: { evidence: [null] },
      files: [new File(["proof"], "proof.png", { type: "image/png" })],
      fileVariable: "evidence",
    });

  // ClickUp 869fmvtdy: an HTML error page showed as a JSON parse error.
  it("turns an HTML error page into a short message", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("<!DOCTYPE html><html>Bad gateway</html>", {
          status: 502,
          headers: { "content-type": "text/html" },
        }),
      ),
    );
    await expect(send()).rejects.toThrow(en.common.requestFailed);
  });

  it("explains an upload that is too large", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("<html>413 Request Entity Too Large</html>", {
          status: 413,
          headers: { "content-type": "text/html" },
        }),
      ),
    );
    await expect(send()).rejects.toThrow(en.common.uploadTooLarge);
  });

  it("still shows the API's message for a GraphQL error", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify({ errors: [{ message: "Duplicate complaint" }] }),
            { status: 200, headers: { "content-type": "application/json" } },
          ),
        ),
    );
    await expect(send()).rejects.toThrow("Duplicate complaint");
  });
});
