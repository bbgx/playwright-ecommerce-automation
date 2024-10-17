import { type Page, type Locator } from '@playwright/test';

export class CommonPage {
  readonly page: Page;
  readonly openSideMenuButton: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openSideMenuButton = this.page.getByTestId('open-menu');
    this.itemName = this.page.getByTestId('inventory-item-name');
    this.itemDescription = this.page.getByTestId('inventory-item-desc');
    this.itemPrice = this.page.getByTestId('inventory-item-price');
  }

  async openSideMenu() {
    // eslint-disable-next-line playwright/no-force-option
    await this.openSideMenuButton.click({ force: true });
  }
}
