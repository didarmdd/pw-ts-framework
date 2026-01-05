import { test, expect, request } from "@playwright/test";
import { loadEnv } from "../../config/env";
import { getObpDirectLoginToken } from "../../core/api/obpAuth";
import { endpoints } from "../../config/endpoints";

test("OBP current user returns 200", async () => {
  const envName = (process.env.ENV as "dev" | "stg" | "prod") ?? "dev";
  const env = loadEnv(envName);

  const token = await getObpDirectLoginToken();

  const api = await request.newContext({
    baseURL: env.apiUrl,
    extraHTTPHeaders: {
      Accept: "application/json",
      Authorization: `DirectLogin token=${token}`
    }
  });

  const res = await api.get(endpoints.obpCurrentUser);
  expect(res.status()).toBe(200);
});
