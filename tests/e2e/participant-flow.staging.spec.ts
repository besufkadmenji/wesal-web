import { expect, test } from "@playwright/test";

test("@staging authenticates dedicated participant customer token", async ({ request }) => {
  test.skip(
    process.env.E2E_STAGING !== "true" || !process.env.E2E_USER_TOKEN,
    "Set E2E_STAGING=true and dedicated E2E_USER_TOKEN to run staging smoke",
  );
  const response = await request.post("/api/proxy/graphql", {
    headers: { authorization: `Bearer ${process.env.E2E_USER_TOKEN}` },
    data: { query: "query StagingParticipantUser { meUser { id name } }" },
  });
  expect(response.ok()).toBe(true);
  const payload = await response.json();
  expect(payload.data.meUser.id).toBeTruthy();
});
