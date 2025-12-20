import { Page, Locator, expect } from "@playwright/test";

/**
 * LoginSignupPage - Handles both Login and Signup forms
 * URL: /login
 * This page contains two sections:
 * 1. Login to your account (left side)
 * 2. New User Signup! (right side)
 */
export class LoginSignupPage {
  readonly page: Page;

  // Login section
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsErrorMessage: Locator;

  // Signup section
  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly emailExistsErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login section locators
    this.loginHeading = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.invalidCredentialsErrorMessage = page.locator(
      "text=Your email or password is incorrect!"
    );

    // Signup section locators
    this.signupHeading = page.getByRole("heading", {
      name: "New User Signup!",
    });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.emailExistsErrorMessage = page.locator(
      "text=Email Address already exist!"
    );
  }

  /**
   * Navigate to the login/signup page
   */
  async goto() {
    await this.page.goto("/login");
  }

  // Login methods

  /**
   * Fill login email field
   */
  async fillLoginEmail(email: string) {
    await this.loginEmailInput.fill(email);
  }

  /**
   * Fill login password field
   */
  async fillLoginPassword(password: string) {
    await this.loginPasswordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login flow
   * @param email - User email
   * @param password - User password
   */
  async login(email: string, password: string) {
    await this.fillLoginEmail(email);
    await this.fillLoginPassword(password);
    await this.clickLoginButton();
  }

  // Signup Methods

  /**
   * Fill signup name field
   */
  async fillSignupName(name: string) {
    await this.signupNameInput.fill(name);
  }

  /**
   * Fill signup email field
   */
  async fillSignupEmail(email: string) {
    await this.signupEmailInput.fill(email);
  }

  /**
   * Click signup button
   */
  async clickSignupButton() {
    await this.signupButton.click();
  }

  /**
   * Fill signup form with name and email
   */
  async fillSignupForm(name: string, email: string) {
    await this.fillSignupName(name);
    await this.fillSignupEmail(email);
  }
}
