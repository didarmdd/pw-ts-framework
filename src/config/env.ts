import dotenv from "dotenv";
import path from "path";

export type EnvName = "dev" | "stg" | "prod";
export type AuthMode = "password" | "sso" | "obp_direct";

export type RuntimeEnv = {
  envName: EnvName;
  baseUrl: string;
  apiUrl: string;
  authMode: AuthMode;
  username?: string;
  password?: string;
  apiToken?: string;
  obpUsername?: string;
  obpPassword?: string;
  obpConsumerKey?: string;
};

export function loadEnv(envName: EnvName): RuntimeEnv {
  const envFile = path.resolve(process.cwd(), "env", `${envName}.env`);
  dotenv.config({ path: envFile });

  const baseUrl = process.env.BASE_URL;
  const apiUrl = process.env.API_URL;

  if (!baseUrl) throw new Error(`Missing BASE_URL in ${envFile}`);
  if (!apiUrl) throw new Error(`Missing API_URL in ${envFile}`);

  const authMode = (process.env.AUTH_MODE ?? "password") as AuthMode;

  return {
    envName,
    baseUrl,
    apiUrl,
    authMode,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    apiToken: process.env.API_TOKEN,
    obpUsername: process.env.OBP_USERNAME,
    obpPassword: process.env.OBP_PASSWORD,
    obpConsumerKey: process.env.OBP_CONSUMER_KEY
  };
}
