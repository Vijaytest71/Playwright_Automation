# Contributing Guide

Thank you for your interest in contributing to this Playwright automation project!

## 🚦 Before You Start

1. **Read the README** - Familiarize yourself with the project structure
2. **Check Issues** - Look for existing issues or discussions
3. **Set up locally** - Install all dependencies and run tests

## 📦 Local Setup

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or higher
- Git

### Environment Setup

```bash
# Clone the repository
git clone <repo-url>
cd Playwright_Automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

## 🧪 Writing Tests

### Test Structure

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/Loginpage';

test.describe('Login Feature', () => {
  let page;
  let loginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('should login successfully', async () => {
    await loginPage.login('username', 'password');
    // Add assertions
  });

  test.afterEach(async () => {
    await page.close();
  });
});
```

### Best Practices

1. **Use Page Objects** - Keep selectors centralized
   ```javascript
   // In pageobjects/
   class MyPage {
     constructor(page) {
       this.page = page;
       this.loginButton = 'button[data-test="login"]';
     }
     
     async clickLogin() {
       await this.page.click(this.loginButton);
     }
   }
   ```

2. **Descriptive Naming**
   ```javascript
   // ✅ Good
   test('should display error message when password is incorrect', async () => {});
   
   // ❌ Avoid
   test('login test', async () => {});
   ```

3. **Proper Waits**
   ```javascript
   // ✅ Good - Playwright waits automatically
   await page.click('button');
   await expect(page.locator('.success')).toBeVisible();
   
   // ❌ Avoid - Manual waits
   await page.waitForTimeout(1000);
   ```

4. **Use Test Fixtures**
   ```javascript
   test.describe.configure({ mode: 'parallel' });
   
   test.beforeEach(async ({ page }) => {
     // Setup before each test
   });
   
   test.afterEach(async ({ page }) => {
     // Cleanup after each test
   });
   ```

## 📝 Running Tests Locally

### Different Modes

```bash
# Headed mode (see browser)
npm run test:headed

# UI mode (interactive inspector)
npm run test:ui

# Debug mode (step-by-step)
npm run test:debug

# Headless mode (CI mode)
npx playwright test

# Specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Specific test file
npx playwright test tests/login.spec.js

# Specific test by name pattern
npx playwright test -g "login"
```

## 🔍 Debugging

### Using Playwright Inspector

```bash
npm run test:debug

# Then use step buttons in the inspector
```

### Using Trace Viewer

```bash
# Tests will create trace files automatically on failure
npm run trace
```

### Adding Console Logs

```javascript
test('my test', async ({ page }) => {
  console.log('Page loaded');
  await page.goto('http://example.com');
});
```

### Taking Screenshots

```javascript
// Manual screenshot
await page.screenshot({ path: 'screenshot.png' });

// Configured to auto-capture on failure
```

## ✅ Code Quality

### Running Linter

```bash
# Check code quality
npm run lint

# ESLint rules are in .eslintrc.json
```

### Before Submitting

```bash
# Run all tests
npm run test

# Check code quality
npm run lint

# View test report
npm run report
```

## 🔄 Creating a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feature/add-checkout-tests
   ```

2. **Make your changes**
   - Add tests
   - Update page objects
   - Add/update documentation

3. **Test everything locally**
   ```bash
   npm run test
   npm run lint
   npm run report
   ```

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add checkout flow tests"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/add-checkout-tests
   ```

6. **Open a Pull Request**
   - Fill out the PR template
   - Link related issues
   - Wait for CI to pass
   - Address review feedback

## 📋 PR Checklist

Before submitting your PR, ensure:

- [ ] Tests pass locally (`npm run test`)
- [ ] Code follows the linting rules (`npm run lint`)
- [ ] New tests have descriptive names
- [ ] Page Objects are used where applicable
- [ ] No hardcoded waits (use Playwright's built-in waits)
- [ ] Screenshots/videos will help with debugging
- [ ] Updated README if adding new features
- [ ] Committed changes are logical and related

## 🐛 Reporting Bugs

Found a bug? Create an issue with:

1. **Clear description** - What is the bug?
2. **Reproduction steps** - How to reproduce it?
3. **Expected vs. actual** - What should happen vs. what does happen?
4. **Environment** - Node.js version, browser, OS
5. **Logs/artifacts** - Error messages, screenshots, videos

Use the bug report template when creating the issue.

## 🤔 Questions & Discussions

- Use **Discussions** for questions
- Use **Issues** for bugs and feature requests
- Check existing issues before creating new ones

## 📚 Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 🎯 Development Workflow

```
┌─────────────────────────────────────┐
│ Create Feature Branch                │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Write/Update Tests                  │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Run Tests Locally (npm run test)    │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Check Linting (npm run lint)        │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Commit & Push Changes                │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Create Pull Request                  │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ CI Pipeline Runs (GitHub Actions)   │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Address Review Feedback              │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│ Merge to Main Branch                 │
└─────────────────────────────────────┘
```

## 🎓 Learning Resources

### Getting Started with Playwright
- Start with the [official tutorial](https://playwright.dev/docs/intro)
- Review examples in the `tests/` directory
- Use Playwright Inspector for testing

### Page Object Model Pattern
- Helps organize test code
- Makes tests more maintainable
- See examples in `pageobjects/`

### CI/CD with GitHub Actions
- Configuration in `.github/workflows/playwright.yml`
- Runs on every push and pull request
- Provides test reports and artifacts

## 🏆 Thank You!

Your contributions help make this project better. We appreciate your effort!

For questions, feel free to open an issue or reach out to the maintainers.
