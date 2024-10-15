import { test, expect } from "@playwright/test";
import { users } from './fixtures/users.json';
import { LoginPage } from "../pages/login-page";

test.describe("Test application login scenarios", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test("Login with a valid user and check if the products page is shown correctly.", async ({ page }) => {
    await loginPage.usernameField.fill('standard_user');
    await loginPage.passwordField.fill('secret_sauce');
    await loginPage.loginButton.click();
    
    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });

  users.forEach((user) => {
    test(`Test invalid login scenarios with username ${user.username || 'empty'} and password ${user.password || 'empty'}`, async ({page}) => {
      await loginPage.usernameField.fill(user.username);
      await loginPage.passwordField.fill(user.password);
      await loginPage.loginButton.click();

      await expect(page.getByTestId('error')).toHaveText(user.expectedError);
    });
  });
});

