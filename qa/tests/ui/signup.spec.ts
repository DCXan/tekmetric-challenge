import { test, expect } from "@playwright/test";

test.describe("e2e - sign up", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");
  });

  test("happy path - sign up as new user - required fields only", async ({
    page,
  }) => {
    // Click 'Signup / Login' link
    // Under 'New User Signup!', fill in Name input
    // Fill in 'Email Address' input
    // Click 'Signup' button
    // Assert 'Name' is pre-filled
    // Assert 'Name' field is editable
    // Assert 'Email is pre-filled
    // Assert 'Email' field in not editable
    // Fill in 'Password' input
    // Fill in 'First name' input
    // Fill in 'Last name' input
    // Fill in 'Address' input
    // Click 'Country' dropdown
    // Click country
    // Fill in 'State' input
    // Fill in 'City' input
    // Fill in 'Zipcode' input
    // Fill in 'Mobile Number' input
    // Click 'Create Account' button
    // Assert redirect to /account_created
    // Assert 'Account Created!' header
    // Assert 'Congratulations!...' text
    // Click 'Continue' button
    // Assert redirect to homepage
    // Assert 'Logout' link is visible
    // Assert 'Delete Account' link is visible
    // Assert 'Logged in as {name}' text is visible
  });

  test("unhappy path - sign up using existing email", async ({ page }) => {});

  test("unhappy path - sign up with missing required password field", async ({
    page,
  }) => {});
});
