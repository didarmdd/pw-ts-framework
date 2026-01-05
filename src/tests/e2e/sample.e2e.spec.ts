import { test, expect } from "@fixtures/testFixtures";
import { HomePage } from "@pages/homePage";

test("Sample E2E flow @smoke @e2e", async ({ apiClient, authedPage }) => {
  // Example pattern:
  // 1) Create data via API
  // const res = await apiClient.post("/something", { ... });
  // apiClient.expectOk(res);

  // 2) Validate in UI
  const home = new HomePage(authedPage);
  await home.open();
  await home.assertLoaded();

  await expect(authedPage).toHaveTitle(/.+/);
});
