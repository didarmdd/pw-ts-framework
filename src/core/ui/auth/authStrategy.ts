import { Browser, Page } from "@playwright/test";

export type AuthMode = "password" | "sso";

export type PasswordAuthInput = {
  baseUrl: string;
  loginPath: string;
  username: string;
  password: string;
  selectors: {
    username: string;
    password: string;
    submit: string;
    postLoginUrlHint?: string;
  };
};

export type SsoAuthInput = {
  baseUrl: string;
  loginPath: string;
  notes: string;
};

export interface AuthStrategy {
  login(browser: Browser): Promise<Page>;
}
