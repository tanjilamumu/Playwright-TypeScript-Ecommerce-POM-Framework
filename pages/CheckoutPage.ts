import type { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly loginPageLink: Locator;
  readonly shippingAddressSelect: Locator;
  readonly shippingMethodsButton: Locator;
  readonly continueButton: Locator;
  readonly paymentMethodsButton: Locator;
  readonly confirmOrderButton: Locator;
  readonly orderPlacedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginPageLink = page.getByRole('link', { name: 'login page' });

    // Checkout controls
    this.shippingAddressSelect = page.locator('#input-shipping-address');
    this.shippingMethodsButton = page.locator('#button-shipping-methods');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    this.paymentMethodsButton = page.locator('#button-payment-methods');
    this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });

    this.orderPlacedHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
  }
  async clickLoginPage(): Promise<void> {
    await this.loginPageLink.click();
  }
  async selectShippingAddressByIndex(index: number): Promise<void> {
    await this.shippingAddressSelect.selectOption({ index });
  }
  async continueShipping(): Promise<void> {
    await this.shippingMethodsButton.click();
    await this.continueButton.click();
  }
  async continuePayment(): Promise<void> {
    await this.paymentMethodsButton.click();
    await this.continueButton.click();
  }
  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }
  async isOrderPlacedVisible(): Promise<boolean> {
    return await this.orderPlacedHeading.isVisible();
  }
}
