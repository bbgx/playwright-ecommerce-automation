import test, { expect } from '@playwright/test';
import { LoginPage, CommonPage, ProductDetailsPage } from '../pages';

test.describe('Test product page functionalities and information.', () => {
  let loginPage: LoginPage;
  let commonPage: CommonPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await page.goto('/');
    await loginPage.loginViaUi();
  });

  test('Assert if product name matches with the name in inventory list.', async () => {
    const itemName = await commonPage.itemName.first().innerText();
    await commonPage.itemName.first().click();

    await expect(commonPage.itemName).toHaveText(itemName);
  });

  test('Assert if product description matches with the name in inventory list.', async () => {
    const itemName = await commonPage.itemDescription.first().innerText();
    await commonPage.itemName.first().click();

    await expect(commonPage.itemDescription).toHaveText(itemName);
  });

  test('Assert if product price matches with the price in inventory list.', async () => {
    const itemName = await commonPage.itemPrice.first().innerText();
    await commonPage.itemName.first().click();

    await expect(commonPage.itemPrice).toHaveText(itemName);
  });

  test('Assert if "Remove" button inside product page removes the added item from shopping cart.', async ({
    page,
  }) => {
    await commonPage.itemName.first().click();
    await productDetailsPage.addItemToCart.click();
    await productDetailsPage.removeItemFromCart.click();

    await Promise.all([
      await expect(page.getByTestId('shopping-cart-badge')).toBeHidden(),
      await expect(productDetailsPage.addItemToCart).toBeVisible(),
    ]);
  });

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip('Assert if "Reset App State" function resets the app state inside the product page.', async ({
    page,
  }) => {
    // This test will break since the reset app state do not reset the "Add to cart" button state
    await commonPage.itemName.first().click();
    await productDetailsPage.addItemToCart.click();

    await commonPage.openSideMenu();
    await page.getByTestId('reset-sidebar-link').click();

    await Promise.all([
      await expect(page.getByTestId('shopping-cart-badge')).toBeHidden(),
      await expect(productDetailsPage.addItemToCart).toBeVisible(),
    ]);
  });
});
