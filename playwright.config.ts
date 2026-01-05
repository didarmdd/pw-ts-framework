import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "./src/config/env";

const envName = (process.env.ENV as "dev" | "stg" | "prod") ?? "dev";
const env = loadEnv(envName);

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: env.baseUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  reporter: [
    ["html", { outputFolder: "artifacts/playwright-report", open: "never" }],
    ["list"],
    ["allure-playwright", { outputFolder: "artifacts/allure-results" }]
  ],
  projects: [
    {
      name: "ui-chromium",
      testMatch: [/.*\.ui\.spec\.ts/, /.*\.e2e\.spec\.ts/],
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "api",
      testMatch: [/.*\.api\.spec\.ts/],
      use: {}
    }
  ]
});
