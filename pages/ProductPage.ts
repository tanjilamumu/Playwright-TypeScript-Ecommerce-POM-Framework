
import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly deliveryDateInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishListIcon: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // Delivery date input
    this.deliveryDateInput = page.locator('#input-option-225');

    // Add to Cart button
    this.addToCartButton = page.getByRole('button', {
      name: 'Add to Cart'
    });

    // Add to Wishlist button
    this.addToWishListIcon = page.locator(
      "//div//button//i[@class='fa-solid fa-heart']"
    );

    // Success message
    this.successAlert = page.locator(
      'div.alert.alert-success.alert-dismissible'
    );
  }

  // Enter delivery date
  async setDeliveryDateISO(
    yyyyMmDd: string
  ): Promise<void> {
    await this.deliveryDateInput.fill(yyyyMmDd);
  }

  // Generate date: Today + N days
  static buildISODatePlusDays(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);

    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = String(d.getFullYear());

    return `${yyyy}-${mm}-${dd}`;
  }

  // Add product to cart
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  // Add product to wishlist
  async addToWishList(): Promise<void> {
    await this.addToWishListIcon.click();
  }

  // Verify success message
  async expectSuccessContains(
    text: string
  ): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText(text);
  }
}
