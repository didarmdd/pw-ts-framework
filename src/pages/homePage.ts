import { Page, expect } from "@playwright/test";
import { BasePage } from "@core/ui/basePage";
import { routes } from "@config/urls";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto(routes.home);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/.*/);
  }
}
