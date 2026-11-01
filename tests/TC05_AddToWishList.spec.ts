import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';

test('@regression TC05_AddToWishList', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const category = new CategoryPage(page);
  const product = new ProductPage(page);

  await home.goto();
  await home.openMyAccount();
  await home.clickLogin();

  await login.login('sid@cloudberry.services', 'Test123');

  await home.openAllLaptopsAndNotebooks();
  await category.openProductByName('HP LP3065');

  await product.addToWishList();
  await product.expectSuccessContains(expect, 'Success');
});
