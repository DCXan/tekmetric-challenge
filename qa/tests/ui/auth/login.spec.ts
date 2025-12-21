import { test, expect } from "@playwright/test";
import { Navbar } from "../../../pages/Navbar";
import { LoginSignupPage } from "../../../pages/LoginSignupPage";
import { generateUserData } from "../../../utils/test-data-generator";
import { AccountApiClient } from "../../../api/AccountApiClient";

test.describe("e2e - happy and unhappy log in", () => {
  let navbar: Navbar;
  let loginSignupPage: LoginSignupPage;
  let accountApi: AccountApiClient;
  let userAccountCredentials: { email: string; password: string };

  test.beforeEach(async ({ page, request }) => {
    navbar = new Navbar(page);
    loginSignupPage = new LoginSignupPage(page);
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

  test("should log in successfully with valid email and password @login @happy", async ({
    page,
  }) => {
    // Create user data
    const user = generateUserData();
    userAccountCredentials = user;

    // Create account via API
    await accountApi.createAccountFromUserData(user);

    // Assert login heading is visible
    await expect(loginSignupPage.loginHeading).toBeVisible();

    // Log in with valid email and password
    await loginSignupPage.login(user.email, user.password);

    // Assert redirect to homepage
    await expect(page).toHaveURL("/");

    // Assert 'Logout' link is visible
    await expect(navbar.logoutLink).toBeVisible();

    // Assert 'Delete Account' link is visible
    await expect(navbar.deleteAccountLink).toBeVisible();

    // Assert 'Logged in as {name}' text is the user's name
    await expect(navbar.loggedInUsername).toHaveText(user.fullName);
  });
  // test("should show error when logging in with invalid password @login @unhappy", async ({
  //   page,
  // }) => {});
  // test("should show error when signing up with invalid email (missing domain) @login @unhappy", async ({
  //   page,
  // }) => {});
});
