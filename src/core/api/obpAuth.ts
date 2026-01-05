import { request } from "@playwright/test";
import { loadEnv } from "../../config/env";
import { endpoints } from "../../config/endpoints";

export async function getObpDirectLoginToken(): Promise<string> {
  const envName = (process.env.ENV as "dev" | "stg" | "prod") ?? "dev";
  const env = loadEnv(envName);

  if (!env.obpUsername || !env.obpPassword || !env.obpConsumerKey) {
    throw new Error(
      "Missing OBP credentials (OBP_USERNAME, OBP_PASSWORD, OBP_CONSUMER_KEY) in environment"
    );
  }

  const context = await request.newContext({
    baseURL: env.apiUrl
  });

  const authHeader = `DirectLogin username="${env.obpUsername}",password="${env.obpPassword}",consumer_key="${env.obpConsumerKey}"`;

  const response = await context.post(endpoints.obpDirectLogin, {
    headers: {
      Authorization: authHeader
    }
  });

  if (!response.ok()) {
    throw new Error(
      `Failed to get OBP token. Status: ${response.status()} ${response.statusText()}`
    );
  }

  const json = await response.json();
  return json.token;
}
