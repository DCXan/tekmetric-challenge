import { test, expect } from "@playwright/test";

test.describe("e2e - log in/log out", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");

    // Click 'Signup / Login' link
    await page.getByRole("link", { name: "Signup / Login" }).click();
  });

  test("should log in successfully with valid email and password @login @happy", async ({
    page,
  }) => {
    await page.getByRole("heading", { name: "New User Signup!" }).waitFor();
  });

  test("should show error when logging in with invalid password @login @unhappy", async ({
    page,
  }) => {});

  test("should show error when signing up with invalid email (missing domain) @login @unhappy", async ({
    page,
  }) => {});
});
