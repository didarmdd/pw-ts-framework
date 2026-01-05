import { Page, Locator } from "@playwright/test";
import { routes } from "@config/urls";

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(private page: Page) {
    // Replace these selectors with your app selectors or data-testid
    this.username = page.locator("[data-testid='login-username']");
    this.password = page.locator("[data-testid='login-password']");
    this.submit = page.locator("[data-testid='login-submit']");
  }

  async goto() {
    await this.page.goto(routes.login);
  }
}
