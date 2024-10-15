import { test, expect } from "@playwright/test";
import { users } from './fixtures/users.json';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
})

test.describe("Test application login scenarios", () => {
  test("Login with a valid user and check if the products page is shown correctly.", async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    
    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });

  users.forEach((user, index) => {
    test(`Test invalid login scenarios with username ${user.username ? user.username : 'empty'} and password ${user.password ? user.password : 'empty'}`, async ({page}) => {
      await page.getByTestId('username').fill(user.username);
      await page.getByTestId('password').fill(user.password);
      await page.getByTestId('login-button').click();

      await expect(page.getByTestId('error')).toHaveText(user.expectedError);
    });
  });
});

