import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AffiliatePage } from '../pages/AffiliatePage';

test('@regression TC06_AddAffiliate', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const affiliate = new AffiliatePage(page);

  await home.goto();
  await home.openMyAccount();
  await home.clickLogin();

  await login.login('sid@cloudberry.services', 'Test123');

  await affiliate.openFromFooter();
  await affiliate.fillAffiliateForm({
    company: 'CloudBerry',
    website: 'cloudberry.services',
    taxId: '12345',
    payeeName: 'Sid',
  });
  await affiliate.submit();

  await affiliate.expectSuccessContains('Success');
});