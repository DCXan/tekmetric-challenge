import { APIRequestContext } from "@playwright/test";

/**
 * AccountApiClient - Handles account-related API operations
 * Base URL: https://automationexercise.com/api
 */
export class AccountApiClient {
  private request: APIRequestContext;
  private baseURL = "https://automationexercise.com/api";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Delete a user account via API
   * @param email - User's email address
   * @param password - User's password
   * @returns API response with success/error message
   */
  async deleteAccount(
    email: string,
    password: string
  ): Promise<{
    responseCode: number;
    message: string;
  }> {
    try {
      const response = await this.request.delete(
        `${this.baseURL}/deleteAccount`,
        {
          form: {
            email,
            password,
          },
        }
      );

      const responseBody = await response.json();

      return {
        responseCode: responseBody.responseCode || response.status(),
        message: responseBody.message || "",
      };
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  }

  /**
   * Verify account deletion was successful
   * @param email - User's email
   * @param password - User's password
   */
  async verifyAccountDeleted(
    email: string,
    password: string
  ): Promise<boolean> {
    const result = await this.deleteAccount(email, password);
    return result.responseCode === 200 && result.message === "Account deleted!";
  }

  /**
   * Safe delete - doesn't throw error if account doesn't exist
   * Useful for cleanup in afterEach
   */
  async safeDeleteAccount(email: string, password: string): Promise<void> {
    try {
      await this.deleteAccount(email, password);
    } catch (error) {
      // Silently ignore errors during cleanup
      console.log(`Could not delete account ${email}:`, error);
    }
  }
}
