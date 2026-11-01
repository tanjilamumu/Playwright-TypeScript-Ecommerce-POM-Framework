# E-Commerce Test Automation Framework

### Playwright | TypeScript | Page Object Model (POM) | Data-Driven Testing | CI/CD

This project is an end-to-end test automation framework developed using **Microsoft Playwright and TypeScript**. It follows the **Page Object Model (POM)** design pattern to improve code reusability, maintainability, scalability, and readability.

The framework automates key workflows of the [CloudBerry Store](https://cloudberrystore.services/) e-commerce application, including user login, product selection, shopping cart management, checkout, wishlist functionality, and affiliate registration.

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | Web UI test automation |
| TypeScript | Programming language |
| Node.js | JavaScript runtime |
| npm | Package management |
| Page Object Model | Automation design pattern |
| JSON | Data-driven testing |
| Git & GitHub | Version control |
| Jenkins | CI/CD integration |
| GitHub Actions | Automated test execution (when configured) |
| Playwright HTML Reporter | Test execution reports |

## Project Structure

```text
ecommerce-playwright-pom-framework-TS/
│
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── AccountPage.ts
│   ├── CategoryPage.ts
│   ├── ProductPage.ts
│   ├── CheckoutPage.ts
│   └── AffiliatePage.ts
│
├── tests/
│   ├── TC01_LaunchApplication.spec.ts
│   ├── TC02_Login.spec.ts
│   ├── TC03_AddToCart.spec.ts
│   ├── TC04_CompletePurchase.spec.ts
│   ├── TC05_AddToWishList.spec.ts
│   └── TC06_AddAffiliate.spec.ts
│
├── utils/
│   └── CloudBerryStoreTestData.json
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Additional CI/CD configuration files may be added depending on the deployment environment.

## Automated Test Scenarios

| Test ID | Test Scenario | Test Tags |
|---|---|---|
| TC01 | Launch application and verify page title | `@sanity` `@regression` |
| TC02 | Validate login functionality using JSON test data | `@sanity` `@datadriven` `@regression` |
| TC03 | Select product and add it to shopping cart | `@sanity` `@regression` |
| TC04 | Complete checkout and verify order confirmation | `@sanity` `@regression` |
| TC05 | Add product to wishlist | `@regression` |
| TC06 | Submit affiliate registration details | `@regression` |

## Framework Features

- **Page Object Model:** Separates page locators and reusable actions from test scripts.
- **TypeScript:** Provides static type checking and improved maintainability.
- **Data-Driven Testing:** Uses JSON data to execute login tests with multiple datasets.
- **Cross-Browser Testing:** Configured for Chromium, Firefox, Microsoft Edge, and WebKit.
- **Reusable Methods:** Encapsulates navigation, login, product selection, checkout, and assertions.
- **Playwright Auto-Waiting:** Uses locator-based interactions and assertions.
- **Test Categorization:** Supports sanity, regression, and data-driven test tags.
- **Test Reporting:** Generates HTML reports and captures failure artifacts.
- **CI/CD Ready:** Designed for integration with Jenkins or GitHub Actions.

## Prerequisites

Ensure the following tools are installed:

- Node.js (supported LTS version)
- npm
- Visual Studio Code (recommended)
- Git
- Playwright browser dependencies

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR-TYPESCRIPT-REPOSITORY-URL>
cd ecommerce-playwright-pom-framework-TS
```

Replace the placeholder with the GitHub URL for this TypeScript project.

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

Microsoft Edge must also be installed if running the Edge project.

### 4. Validate TypeScript

```bash
npx tsc --noEmit
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests in Chrome project

```bash
npx playwright test --project=chrome
```

### Run a specific test

```bash
npx playwright test TC02_Login.spec.ts
```

### Run sanity tests

```bash
npx playwright test --grep @sanity
```

### Run regression tests

```bash
npx playwright test --grep @regression
```

### Run data-driven tests

```bash
npx playwright test --grep @datadriven
```

### Run tests with Playwright UI Mode

```bash
npx playwright test --ui
```

## Data-Driven Testing

The framework uses JSON-based test data for login automation.

Example test data structure:

```json
{
  "Sheet1": [
    {
      "username": "valid-user@example.com",
      "password": "example-password"
    }
  ]
}
```

The login test iterates through the datasets and executes the login workflow for each entry.

The current login test expects successful authentication for every dataset. Negative login scenarios require separate assertions for error messages.

**Security:** Use only dedicated test accounts and never commit real passwords, API keys, or other secrets to GitHub. For CI/CD execution, store sensitive credentials in environment variables or secret-management facilities.

## Page Object Model Design

Each application page is represented by a dedicated TypeScript class.

For example, `LoginPage.ts` encapsulates the login elements and reusable login method.

```typescript
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.email = page.getByRole('textbox', {
      name: 'E-Mail Address'
    });

    this.password = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });
  }

  async login(
    username: string,
    password: string
  ): Promise<void> {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
```

Test scripts create instances of Page Object classes and call reusable methods rather than duplicating locators.

## Assertions and Validation

The framework uses Playwright assertions to validate application behavior.

Examples include:

```typescript
await expect(page).toHaveTitle('Your store of fun');
```

```typescript
await expect(account.myAccountHeading).toBeVisible();
```

```typescript
await expect(checkout.orderPlacedHeading).toBeVisible();
```

Assertions verify expected results and help identify application defects.

## Cross-Browser Testing

The Playwright configuration includes the following browser projects:

| Project | Browser Engine |
|---|---|
| chrome | Chromium |
| firefox | Firefox |
| edge | Chromium (Microsoft Edge channel) |
| safari | WebKit |

The `safari` project uses WebKit rather than launching the native Safari browser.

Run an individual browser project:

```bash
npx playwright test --project=firefox
```

```bash
npx playwright test --project=edge
```

```bash
npx playwright test --project=safari
```

## Test Reports

The framework uses Playwright's built-in HTML reporting.

After execution, open the report:

```bash
npx playwright show-report
```

The configuration also retains failure artifacts such as screenshots, videos, and traces.

To inspect a saved trace:

```bash
npx playwright show-trace path/to/trace.zip
```

## CI/CD Integration

The framework can be integrated into Jenkins and GitHub Actions to execute automated tests after code changes or on a schedule.

A typical CI/CD workflow includes:

1. Checkout source code from GitHub.
2. Install Node.js dependencies using `npm ci`.
3. Install required Playwright browsers.
4. Run TypeScript validation.
5. Execute automated tests in headless mode.
6. Publish test reports and failure artifacts.

The browser execution environment must include the required browser installations and operating-system dependencies.

## Best Practices

- Maintain separate Page Object classes for application pages.
- Keep test scripts readable and focused on business workflows.
- Prefer reliable Playwright locators.
- Avoid unnecessary fixed waits.
- Use reusable methods for common interactions.
- Apply explicit assertions for expected outcomes.
- Keep credentials and sensitive data outside source control.
- Use version control for framework maintenance.
- Review failed tests using screenshots, videos, and traces.
- Run automated regression tests before releases.

## Future Enhancements

Potential enhancements include:

- API automation using Playwright's APIRequestContext
- Authentication fixtures and reusable login state
- Positive and negative test-data separation
- Additional product and checkout validation
- Parallel execution optimization
- Environment-specific configuration
- Improved Jenkins and GitHub Actions pipelines
- Custom test reporting and dashboards
- Accessibility testing

## Project Purpose

This framework demonstrates practical skills in designing and maintaining a TypeScript-based Playwright automation solution for e-commerce applications.

It focuses on reusable Page Object classes, end-to-end test scenarios, data-driven testing, assertions, cross-browser execution, and CI/CD integration.

## Author

**Tanjila Mumu**

QA Automation Engineer | Playwright | TypeScript | Selenium | API Testing | CI/CD

