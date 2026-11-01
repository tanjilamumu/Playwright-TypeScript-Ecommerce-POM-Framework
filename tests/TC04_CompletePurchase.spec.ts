import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';

test('@sanity @regression TC04_CompletePurchase', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  const login = new LoginPage(page);

  await home.goto();
  await home.openAllLaptopsAndNotebooks();
  await category.openProductByName('HP LP3065');

  // Fix: use getDate() (day-of-month) under the hood via helper
  const deliveryDate = ProductPage.buildISODatePlusDays(5);
  await product.setDeliveryDateISO(deliveryDate);

  await product.addToCart();

  await home.goToCheckout();

  await checkout.clickLoginPage();
  await login.login('sid@cloudberry.services', 'Test123');

  await checkout.selectShippingAddressByIndex(1);
  await checkout.continueShipping();
  await checkout.continuePayment();
  await checkout.confirmOrder();

  await expect(checkout.orderPlacedHeading).toBeVisible();
});
