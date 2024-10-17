import { expect, test } from '@playwright/test';
import { menuLink } from './fixtures/navigation.json';
import { LoginPage, CommonPage } from '../pages';

test.describe('Test navigation side menu scenarios.', () => {
  let loginPage: LoginPage;
  let commonPage: CommonPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);

    await loginPage.loginViaUi();
  });

  menuLink.forEach((menuItem) => {
    test(`Assert menu item ${menuItem.text} consistency.`, async ({ page }) => {
      await commonPage.openSideMenu();

      await Promise.all([
        await expect(page.getByTestId(menuItem.attr)).toBeVisible(),
        await expect(page.getByTestId(menuItem.attr)).toHaveAttribute(
          'href',
          menuItem.href,
        ),
        await expect(page.getByTestId(menuItem.attr)).toHaveText(menuItem.text),
      ]);
    });
  });

  test("Assert if 'All Items' menu option is working correctly.", async ({
    page,
  }) => {
    await page.getByTestId('shopping-cart-link').click();
    await commonPage.openSideMenu();

    await page.getByTestId('inventory-sidebar-link').click();

    await expect(page.getByTestId('inventory-container')).toBeVisible();
  });

  test("Assert if the 'Logout' menu option logs out the user and redirects to login form.", async ({
    page,
  }) => {
    await commonPage.openSideMenu();
    await page.getByTestId('logout-sidebar-link').click();

    await expect(loginPage.usernameField).toBeVisible();
    const cookies = await page.context().cookies();
    expect(
      cookies.find((cookie) => cookie.name === 'session-username'),
    ).toBeUndefined();
  });

  test("Assert if the 'About' menu option is redirecting to the correct website.", async ({
    page,
  }) => {
    await commonPage.openSideMenu();

    await page.getByTestId('about-sidebar-link').click();

    await page.waitForURL('https://saucelabs.com/');
    await expect(page).toHaveURL('https://saucelabs.com/');
  });

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip("Assert if the 'Reset App State' menu option clears the shopping cart and reset the page DOM.", async ({
    page,
  }) => {
    // This test will break since the reset app state do not reset the "Add to cart" button state
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await commonPage.openSideMenu();
    await page.getByTestId('reset-sidebar-link').click();

    await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
    await expect(
      page.getByTestId('add-to-cart-sauce-labs-backpack'),
    ).toBeVisible();
  });
});
