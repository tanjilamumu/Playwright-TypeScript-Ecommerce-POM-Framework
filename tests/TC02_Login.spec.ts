import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

import testData from '../utils/CloudBerryStoreTestData.json';
type UserRow = { username: string; password: string };
const users = (testData.Sheet1 ?? []) as UserRow[];

for (const data of users) {
  test(`@sanity @datadriven @regression TC02_Login - ${data.username}`, async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);

    await home.goto();
    await home.openMyAccount();
    await home.clickLogin();

    await login.login(data.username, data.password);

    await expect(account.myAccountHeading).toBeVisible();
  });
}
