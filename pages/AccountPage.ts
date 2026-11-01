import type {Page, Locator} from '@playwright/test';
export class AccountPage {
  readonly page: Page;
  readonly myAccountHeading: Locator;
  constructor(page: Page) {
    this.page = page;
    this.myAccountHeading = page.locator("//h1[normalize-space()='My Account']");
  }

  async isMyAccountVisible(): Promise<boolean> {
    return await this.myAccountHeading.isVisible();
  }
}


