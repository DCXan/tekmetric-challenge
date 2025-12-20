// components/Navbar.ts
import { Page, Locator, expect } from "@playwright/test";

export class Navbar {
  readonly page: Page;

  // Navigation Links
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;

  // Account Actions
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.homeLink = page.locator('a[href="/"]').first();
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.signupLoginLink = page.locator('a[href="/login"]');

    // Account Actions
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
  }

  // Gets the "Logged in as..." username
  async getLoggedInUsername(): Promise<string> {
    const usernameElement = this.page.locator('a:has([class="fa fa-user"]) b');
    const username = await usernameElement.textContent();
    return username?.trim() || "";
  }
}
