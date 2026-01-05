import { test, expect } from "@playwright/test";
import { HomePage } from "@pages/homePage";

test("Home page loads @smoke @ui", async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.assertLoaded();
  await expect(page).toHaveTitle(/.+/);
});
