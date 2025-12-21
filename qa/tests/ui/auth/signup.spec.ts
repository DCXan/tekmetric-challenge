import { test, expect } from "@playwright/test";
import { Navbar } from "../../../pages/Navbar";
import { LoginSignupPage } from "../../../pages/LoginSignupPage";
import { SignupFormPage } from "../../../pages/SignupFormPage";
import { generateUserData } from "../../../utils/test-data-generator";
import { AccountApiClient } from "../../../api/AccountApiClient";

test.describe("e2e - sign up", () => {
  let navbar: Navbar;
  let loginSignupPage: LoginSignupPage;
  let signupFormPage: SignupFormPage;
  let accountApi: AccountApiClient;
  let userAccountCredentials: { email: string; password: string };

  test.beforeEach(async ({ page, request }) => {
    navbar = new Navbar(page);
    loginSignupPage = new LoginSignupPage(page);
    signupFormPage = new SignupFormPage(page);
    accountApi = new AccountApiClient(request);

    // Navigate to homepage
    await page.goto("/");

    // Click 'Signup / Login' link
    await navbar.signupLoginLink.click();
  });

  test.afterEach(async ({ page }) => {
    // Delete the account via API
    await accountApi.safeDeleteAccount(
      userAccountCredentials.email,
      userAccountCredentials.password
    );
  });

  test("should create new user account when all required fields are valid @signup @happy", async ({
    page,
  }) => {
    // Create user data
    const user = generateUserData();
    userAccountCredentials = user;

    // Assert signup heading is visible
    await expect(loginSignupPage.signupHeading).toBeVisible();

    // Fill in name and email on signup form and click 'Signup' button
    await loginSignupPage.fillAndSubmitSignupForm(user.fullName, user.email);

    // Assert 'Name' field is pre-filled with the name entered on previous signup page
    await expect(signupFormPage.nameInput).toHaveValue(user.fullName);

    // Assert 'Name' field is editable (enabled)
    await expect(signupFormPage.nameInput).toBeEnabled();

    // Assert 'Email' field is pre-filled
    await expect(signupFormPage.emailInput).toHaveValue(user.email);

    // Assert 'Email' field in not editable (diabled)
    await expect(signupFormPage.emailInput).toBeDisabled();

    // Fill all required fields on signup form and submit
    await signupFormPage.fillAndSubmitSignupForm(user);

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

    // Click 'Continue' link (looks like button)
    await page.getByRole("link", { name: "Continue" }).click();

    // Assert redirect to homepage
    await expect(page).toHaveURL("/");

    // Assert 'Logout' link is visible
    await expect(navbar.logoutLink).toBeVisible();

    // Assert 'Delete Account' link is visible
    await expect(navbar.deleteAccountLink).toBeVisible();

    // Assert 'Logged in as {name}' text is the user's name
    await expect(navbar.loggedInUsername).toHaveText(user.fullName);
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
