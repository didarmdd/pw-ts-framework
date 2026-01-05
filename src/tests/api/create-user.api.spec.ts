import { test, expect, request } from "@playwright/test";
import { loadEnv } from "../../config/env";
import { getObpDirectLoginToken } from "../../core/api/obpAuth";
import { createObpUser } from "../../core/api/obpUsers";

test("Create new OBP user successfully", async () => {

    const token = await getObpDirectLoginToken();

    const timestamp = Date.now();
    const newUser = {
        email: `testuser_${timestamp}@example.com`,
        username: `user_${timestamp}`,
        password: "SecureP@ssw0rd123",
        first_name: "Test",
        last_name: "User"
    };

    const createdUser = await createObpUser(token, newUser);

    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);
});
