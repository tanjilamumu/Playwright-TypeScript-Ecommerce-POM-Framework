import { expect, type Page, type Locator } from '@playwright/test';

export class AffiliatePage {
  readonly page: Page;
  readonly affiliateFooterLink: Locator;
  readonly company: Locator;
  readonly website: Locator;
  readonly taxId: Locator;
  readonly chequePayee: Locator;
  readonly continueButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.affiliateFooterLink = page.getByRole('link', { name: 'Affiliate', exact: true });

    this.company = page.getByRole('textbox', { name: 'Company' });
    this.website = page.getByRole('textbox', { name: 'Web Site' });
    this.taxId = page.getByRole('textbox', { name: 'Tax ID' });
    this.chequePayee = page.getByRole('textbox', { name: '* Cheque Payee Name' });

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.successAlert = page.locator('div.alert.alert-success.alert-dismissible');
  }

  async openFromFooter(): Promise<void> {
    await this.affiliateFooterLink.click();
  }

  async fillAffiliateForm(
    {
      company,
      website,
      taxId,
      payeeName,
    }: {
      company: string;
      website: string;
      taxId: string;
      payeeName: string;
    }
  ): Promise<void> {
    await this.company.fill(company);
    await this.website.fill(website);
    await this.taxId.fill(taxId);
    await this.chequePayee.fill(payeeName);
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }

  async expectSuccessContains(text: string): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText(text);
  }
}