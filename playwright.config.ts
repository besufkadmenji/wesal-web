import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm exec next start -H 127.0.0.1 -p 3100",
        url: "http://127.0.0.1:3100/en",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: {
          E2E_AUTH_BYPASS: "true",
          API_BASE_URL: "http://127.0.0.1:3999",
          NEXT_PUBLIC_SOCKET: "ws://127.0.0.1:3100/graphql",
        },
      },
});
