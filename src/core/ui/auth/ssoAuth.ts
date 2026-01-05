import { Browser } from "@playwright/test";
import { AuthStrategy, SsoAuthInput } from "./authStrategy";

export class SsoAuth implements AuthStrategy {
  constructor(private input: SsoAuthInput) {}

  async login(browser: Browser) {
    const context = await browser.newContext({});

    const page = await context.newPage();
    await page.goto(`${this.input.baseUrl}${this.input.loginPath}`);

    /*
      SSO note:
      Many orgs require interactive login, device trust, or MFA.
      Best practice is to generate storageState once per environment and reuse it.

      Options:
      1) Manual one time login locally, then save storageState, then CI reuses it
      2) Use test IdP credentials if your org has them
      3) Use Playwright auth with a dedicated service account if allowed

      This placeholder leaves SSO flow to your org requirements.
    */

    return page;
  }
}
