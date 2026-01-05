import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectUrlContains(partial: string) {
    await expect(this.page).toHaveURL(new RegExp(partial.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}
