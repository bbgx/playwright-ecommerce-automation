import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId('username');
    this.passwordField = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
  }

  async loginViaUi() {
    await this.usernameField.fill('standard_user');
    await this.passwordField.fill('secret_sauce');
    await this.loginButton.click();
    
    await expect(this.page.getByTestId('inventory-list')).toBeVisible();
  }
}