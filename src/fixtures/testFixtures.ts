import { test as base, expect, Browser, Page } from "@playwright/test";
import { loadEnv } from "@config/env";
import { ApiClient } from "@core/api/apiClient";
import { storageStateExists, storageStatePath } from "@core/ui/storageState";
import { PasswordAuth } from "@core/ui/auth/passwordAuth";
import { SsoAuth } from "@core/ui/auth/ssoAuth";
import { routes } from "@config/urls";

const envName = (process.env.ENV as "dev" | "stg" | "prod") ?? "dev";
const env = loadEnv(envName);

type Fixtures = {
  apiClient: ApiClient;
  authedPage: Page;
};

async function ensureAuthState(browser: Browser): Promise<string | undefined> {
  if (storageStateExists(env.envName)) return storageStatePath(env.envName);

  if (env.authMode === "password") {
    if (!env.username || !env.password) {
      throw new Error("USERNAME and PASSWORD are required for AUTH_MODE=password");
    }

    const strategy = new PasswordAuth({
      baseUrl: env.baseUrl,
      loginPath: routes.login,
      username: env.username,
      password: env.password,
      selectors: {
        username: "[data-testid='login-username']",
        password: "[data-testid='login-password']",
        submit: "[data-testid='login-submit']",
        postLoginUrlHint: "/"
      }
    });

    const page = await strategy.login(browser);
    const stateFile = storageStatePath(env.envName);
    await page.context().storageState({ path: stateFile });
    await page.context().close();
    return stateFile;
  }

  // For SSO, generate state manually using the script and keep it in artifacts/auth
  return undefined;
}

export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use, testInfo) => {
    const client = new ApiClient(request, env.apiUrl, env.apiToken).withTestInfo(testInfo);
    await use(client);
  },

  authedPage: async ({ browser }, use) => {
    const statePath = await ensureAuthState(browser);
    const context = await browser.newContext(statePath ? { storageState: statePath } : {});
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});

export { expect };
