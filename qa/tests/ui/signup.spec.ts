import { test, expect } from "@playwright/test";
import { Navbar } from "../../pages/Navbar";
import { LoginSignupPage } from "../../pages/LoginSignupPage";
import { SignupFormPage } from "../../pages/SignupFormPage";

test.describe("e2e - sign up", () => {
  let navbar: Navbar;
  let loginSignupPage: LoginSignupPage;
  let signupFormPage: SignupFormPage;

  test.beforeEach(async ({ page }) => {
    navbar = new Navbar(page);
    loginSignupPage = new LoginSignupPage(page);
    signupFormPage = new SignupFormPage(page);

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
    const userData = {
      firstName: "John",
      lastName: "Smith",
      fullName: "John Smith",
      email: "happy_path_signup@email.com",
      password: "password1234",
      address: "1234 Test Ave",
      country: "United States",
      state: "Texas",
      city: "Dallas",
      zipcode: "12345",
      mobileNumber: "1234567890",
    };

    // Wait for the heading
    await page.getByRole("heading", { name: "New User Signup!" }).waitFor();

    // Fill in name and email on signup form and click 'Signup' button
    await loginSignupPage.fillAndSubmitSignupForm(
      userData.fullName,
      userData.email
    );

    // Assert 'Name' field is pre-filled with the name entered on previous signup page
    await expect(signupFormPage.nameInput).toHaveValue(userData.fullName);

    // Assert 'Name' field is editable (enabled)
    await expect(signupFormPage.nameInput).toBeEnabled();

    // Assert 'Email' field is pre-filled
    await expect(signupFormPage.emailInput).toHaveValue(userData.email);

    // Assert 'Email' field in not editable (diabled)
    await expect(signupFormPage.emailInput).toBeDisabled();

    // Fill all required fields
    await signupFormPage.fillAndSubmitSignupForm(userData);

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
    await expect(navbar.loggedInUsername).toHaveText(userData.fullName);
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
