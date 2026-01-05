import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envName = process.env.ENV ?? "dev";
dotenv.config({ path: path.resolve(process.cwd(), "env", `${envName}.env`) });

const baseUrl = process.env.BASE_URL;
const authMode = process.env.AUTH_MODE ?? "password";

if (!baseUrl) {
  throw new Error("Missing BASE_URL in env file");
}

const outDir = path.resolve(process.cwd(), "artifacts", "auth");
fs.mkdirSync(outDir, { recursive: true });

const outFile = path.resolve(outDir, `${envName}.storageState.json`);

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

if (authMode === "sso") {
  console.log("SSO mode: complete login manually in the opened browser window.");
  console.log("After you reach the post login landing page, come back to terminal.");
}

await page.goto(baseUrl);
console.log("When you are fully logged in, press Enter in this terminal to save storageState.");

process.stdin.setEncoding("utf8");
await new Promise((resolve) => process.stdin.once("data", resolve));

await context.storageState({ path: outFile });
await browser.close();

console.log(`Saved storageState to ${outFile}`);
