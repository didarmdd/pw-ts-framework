import { Browser } from "@playwright/test";
import { AuthStrategy, PasswordAuthInput } from "./authStrategy";

export class PasswordAuth implements AuthStrategy {
  constructor(private input: PasswordAuthInput) {}

  async login(browser: Browser) {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${this.input.baseUrl}${this.input.loginPath}`);

    await page.fill(this.input.selectors.username, this.input.username);
    await page.fill(this.input.selectors.password, this.input.password);
    await page.click(this.input.selectors.submit);

    if (this.input.selectors.postLoginUrlHint) {
      await page.waitForURL(new RegExp(this.input.selectors.postLoginUrlHint));
    }

    return page;
  }
}
