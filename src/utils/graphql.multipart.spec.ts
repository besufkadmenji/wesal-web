import { beforeEach, describe, expect, it, vi } from "vitest";
import { graphqlMultipartRequest } from "./graphql.multipart";

describe("graphqlMultipartRequest", () => {
  beforeEach(() => {
    document.cookie = "token=participant-token; path=/";
    document.cookie = "lang=en; path=/";
  });

  it("maps evidence files to GraphQL multipart variables", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { createComplaint: { id: "c1" } } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
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
});
