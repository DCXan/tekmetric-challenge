import { test, expect } from "@playwright/test";
import { Navbar } from "../../../pages/Navbar";
import { LoginSignupPage } from "../../../pages/LoginSignupPage";
import { generateUserData } from "../../../utils/test-data-generator";
import { AccountApiClient } from "../../../api/AccountApiClient";
import { ProductsPage } from "../../../pages/ProductsPage";
import { CartPage } from "../../../pages/CartPage";

test.describe("e2e - checkout", () => {
  let navbar: Navbar;
  let loginSignupPage: LoginSignupPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let accountApi: AccountApiClient;
  let userAccountCredentials: { email: string; password: string };

  test.beforeEach(async ({ page, request }) => {
    navbar = new Navbar(page);
    loginSignupPage = new LoginSignupPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    accountApi = new AccountApiClient(request);

    // Navigate to homepage
    await page.goto("/");

    // Click 'Signup / Login' link
    await navbar.signupLoginLink.click();
  });

  test.afterEach(async ({ page }) => {
    // Delete the account via API
    // await accountApi.safeDeleteAccount(
    //   userAccountCredentials.email,
    //   userAccountCredentials.password
    // );
  });

  test("should add a single product to cart and checkout @checkout", async ({
    page,
  }) => {
    // Create user data
    const user = generateUserData();
    userAccountCredentials = user;

    // Create account via API
    await accountApi.createAccountFromUserData(user);

    // Log in with valid email and password
    await loginSignupPage.login(user.email, user.password);

    // Click 'Products' link
    await navbar.productsLink.click();

    // Add a random product to the cart
    const product = await productsPage.addRandomProductToCart();
    console.log(product);
    // Click the 'View Cart' link
    await page.getByRole("link", { name: "View Cart" }).click();

    // Assert redirect to cart page
    await expect(page).toHaveURL("/view_cart");

    // Assert there is one product row
    expect(await cartPage.getCartItemCount()).toBe(1);

    // Get the product row
    const productRow = await cartPage.findCartRowByProductName(product.name);

    // Assert the product image src in the cart row matches the selected product's img src
    await expect(cartPage.getProductImage(productRow)).toHaveAttribute(
      "src",
      product.imageSrc
    );

    // Assert the product description in the cart row matches the selected product's description
    await expect(cartPage.getProductNameLink(productRow)).toHaveText(
      product.name
    );

    // Assert the product price in the cart row matches the selected product's price
    await expect(cartPage.getPriceText(productRow)).toHaveText(product.price);

    // Assert the product quantity in the cart row is 1
    await expect(cartPage.getQuantityCell(productRow)).toContainText("1");

    // Assert the product price total in the cart row matches the selected product's price
    await expect(cartPage.getTotalPrice(productRow)).toHaveText(product.price);

    // Assert the delete button in the cart row is visible
    await expect(cartPage.getDeleteButton(productRow)).toBeVisible();

    // Assert the delete button in the cart row is enabled
    await expect(cartPage.getDeleteButton(productRow)).toBeEnabled();

    // Click the 'Proceed To Checkout' link
    await cartPage.proceedToCheckoutButton.click();
  });
});
