import { test, expect } from "@playwright/test";

test.describe("e2e - sign up", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");

    // Click 'Signup / Login' link
    await page.getByRole("link", { name: "Signup / Login" }).click();
  });

  test("should create new user account when all required fields are valid @signup @happy", async ({
    page,
  }) => {
    await page.getByRole("heading", { name: "New User Signup!" }).waitFor();
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

  test("should show error when signing up with existing email @signup @unhappy", async ({
    page,
  }) => {});

  test("should show error when signing up with missing name @signup @unhappy", async ({
    page,
  }) => {});

  test("should show error when signing up with invalid email (missing @) @signup @unhappy", async ({
    page,
  }) => {});

  test("should show error when signing up with invalid email (missing domain) @signup @unhappy", async ({
    page,
  }) => {});
});
