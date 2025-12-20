import { test, expect } from "@playwright/test";
import { Navbar } from "../../pages/Navbar";
import { LoginSignupPage } from "../../pages/LoginSignupPage";
import exp = require("constants");

test.describe("e2e - sign up", () => {
  let navbar: Navbar;
  let loginSignupPage: LoginSignupPage;

  test.beforeEach(async ({ page }) => {
    navbar = new Navbar(page);
    loginSignupPage = new LoginSignupPage(page);

    // Navigate to homepage
    await page.goto("/");

    // Click 'Signup / Login' link
    await navbar.signupLoginLink.click();
  });

  test.afterEach(async ({ page }) => {
    await navbar.deleteAccountLink.click(); // refactor with api
  });

  test("should create new user account when all required fields are valid @signup @happy", async ({
    page,
  }) => {
    // Test Data
    const firstName: string = "John";
    const lastName: string = "Smith";
    const fullName: string = `${firstName} ${lastName}`;
    const email: string = "happy_path_signup@email.com";
    const password: string = "password1234";
    const address: string = "1234 Test Ave";
    const country: string = "United States";
    const state: string = "Texas";
    const city: string = "Dallas";
    const zipcode: string = "12345";
    const mobileNumber: string = "1234567890";

    // Wait for the heading
    await page.getByRole("heading", { name: "New User Signup!" }).waitFor();

    // Fill in name and email on signup form and click 'Signup' button
    await loginSignupPage.fillAndSubmitSignupForm(fullName, email);

    // Assert 'Name' field is pre-filled with the name entered on previous signup page
    await expect(
      page.getByRole("textbox", { name: "Name *", exact: true })
    ).toHaveValue(fullName);

    // Assert 'Name' field is editable (enabled)
    await expect(
      page.getByRole("textbox", { name: "Name *", exact: true })
    ).toBeEnabled();

    // Assert 'Email' field is pre-filled
    await expect(
      page.getByRole("textbox", { name: "Email *", exact: true })
    ).toHaveValue(email);

    // Assert 'Email' field in not editable (diabled)
    await expect(
      page.getByRole("textbox", { name: "Email *", exact: true })
    ).toBeDisabled();

    // Fill in 'Password' input
    await page.getByRole("textbox", { name: "Password" }).fill(password);

    // Fill in 'First name' input
    await page.getByRole("textbox", { name: "First Name *" }).fill(firstName);

    // Fill in 'Last name' input
    await page.getByRole("textbox", { name: "Last Name *" }).fill(lastName);

    // Fill in 'Address' input
    await page.getByRole("textbox", { name: "Address *" }).fill(address);

    // Select 'Country' option from dropdown
    await page
      .getByRole("combobox", { name: "Country *" })
      .selectOption(country);

    // Fill in 'State' input
    await page.getByRole("textbox", { name: "State *" }).fill(state);

    // Fill in 'City' input
    await page.getByRole("textbox", { name: "City *" }).fill(city);

    // Fill in 'Zipcode' input (label is wrong for [for="city"] attr)
    await page.locator('[data-qa="zipcode"]').fill(zipcode);

    // Fill in 'Mobile Number' input
    await page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill(mobileNumber);

    // Click 'Create Account' button
    await page.getByRole("button", { name: "Create Account" }).click();

    // Assert redirect to /account_created
    await expect(page).toHaveURL("/account_created");

    // Assert 'Account Created!' header
    await expect(
      page.getByRole("heading", { name: "Account Created!" })
    ).toBeVisible();

    // Assert 'Congratulations!...' text
    await expect(
      page.getByText(
        "Congratulations! Your new account has been successfully created!"
      )
    ).toBeVisible();

    // Click 'Continue' link (looks button)
    await page.getByRole("link", { name: "Continue" }).click();

    // Assert redirect to homepage
    await expect(page).toHaveURL("/");

    // Assert 'Logout' link is visible
    await expect(navbar.logoutLink).toBeVisible();

    // Assert 'Delete Account' link is visible
    await expect(navbar.deleteAccountLink).toBeVisible();

    // Assert 'Logged in as {name}' text is visible
    await expect(navbar.loggedInUsername).toHaveText(fullName);
  });

  // test("should show error when signing up with existing email @signup @unhappy", async ({
  //   page,
  // }) => {});

  // test("should show error when signing up with missing name @signup @unhappy", async ({
  //   page,
  // }) => {});

  // test("should show error when signing up with invalid email (missing @) @signup @unhappy", async ({
  //   page,
  // }) => {});

  // test("should show error when signing up with invalid email (missing domain) @signup @unhappy", async ({
  //   page,
  // }) => {});
});
