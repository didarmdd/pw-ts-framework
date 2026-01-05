import { request } from "@playwright/test";
import { endpoints } from "../../config/endpoints";
import { loadEnv } from "../../config/env";

export interface CreateUserPayload {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface ObpUser {
    user_id: string;
    email: string;
    username: string;
    provider: string;
}

export async function createObpUser(
    token: string,
    payload: CreateUserPayload
): Promise<ObpUser> {
   
    const envName = (process.env.ENV as "dev" | "stg" | "prod") ?? "dev";
    const env = loadEnv(envName);

    const context = await request.newContext({
        baseURL: env.apiUrl,
        extraHTTPHeaders: {
            "Content-Type": "application/json",
            Authorization: `DirectLogin token=${token}`
        }
    });

    const response = await context.post(endpoints.obpUsers, {
        data: payload
    });

    if (!response.ok()) {
        throw new Error(
            `Failed to create user. Status: ${response.status()} ${response.statusText()}. Body: ${await response.text()}`
        );
    }

    return response.json();
}
