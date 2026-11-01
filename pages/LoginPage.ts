import type {Page, Locator} from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}


