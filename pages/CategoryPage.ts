import type { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async openProductByName(productName: string): Promise<void> {
    await this.page.getByText(productName, { exact: true }).click();
  }
}
