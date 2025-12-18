import { test, expect } from "@playwright/test";

test.describe("e2e-Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
  });
});
