import { type Page, type Locator } from '@playwright/test';

export class CommonPage {
  readonly page: Page;
  readonly openSideMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openSideMenuButton = page.getByTestId('open-menu');
  }

  async openSideMenu() {
    // eslint-disable-next-line playwright/no-force-option
    await this.openSideMenuButton.click({ force: true });
  }
}
