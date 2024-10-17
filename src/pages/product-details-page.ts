import { type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly addItemToCart: Locator;
  readonly removeItemFromCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addItemToCart = page.getByTestId('add-to-cart');
    this.removeItemFromCart = page.getByTestId('remove');
  }
}
