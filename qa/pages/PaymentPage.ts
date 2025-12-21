import { Page, Locator, expect } from "@playwright/test";

/**
 * CheckoutPage - Handles the checkout page
 * URL: /checkout
 */
export class CheckoutPage {
  readonly page: Page;

  // Payment Section
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expirationMonth: Locator; // 2-digit MM format
  readonly expirationYear: Locator; // 4-digit YYYY format

  // Place Order Actions
  readonly payAndConfirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Payment Fields
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expirationMonth = page.locator('[data-qa="expiry-month"]');
    this.expirationYear = page.locator('[data-qa="expiry-year"]');

    // Place Order Actions
    this.payAndConfirmOrderButton = page.getByRole("button", {
      name: "Pay and Confirm Order",
    });
  }

  // ========================================
  // PAYMENT METHODS
  // ========================================

  /**
   * Fills in Payment Information with credit card info
   */
}
