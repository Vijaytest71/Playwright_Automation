# Playwright Automation Test Suite

This repository contains automated E2E tests using Playwright.

## 📋 Prerequisites

- Node.js 18+ or 20+
- npm 9+

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Running Tests

```bash
# Run all tests in headed mode
npm run test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests in headless mode
npx playwright test

# Run tests for specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run single test file
npx playwright test tests/login.spec.js
```

### Viewing Test Reports

```bash
# View HTML report
npm run report

# View trace viewer
npm run trace
```

## 📊 CI/CD Pipeline

This project uses **GitHub Actions** for automated testing.

### Workflow File
- Location: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

### Triggers
- **Push** to `main`, `master`, or `develop` branches
- **Pull Requests** to `main`, `master`, or `develop` branches
- **Scheduled** daily at 2 AM UTC

### What Runs in CI
1. **Tests** - Runs on Node.js 18 and 20
2. **Code Linting** - Checks code quality with ESLint
3. **Artifact Collection**:
   - HTML test reports
   - Test results and videos
   - Trace files for debugging

### Artifact Retention
- Test reports: 30 days
- Test videos: 7 days

## 📁 Project Structure

```
├── tests/                    # Test files
│   ├── client.spec.js
│   └── login.spec.js
├── pageobjects/             # Page Object Models
│   └── Loginpage.js
├── features/                # Feature files (BDD)
│   └── Ecommerce.feature
├── playwright-report/       # HTML test reports
├── test-results/            # Test execution artifacts
├── playwright.config.js     # Playwright configuration
├── .github/workflows/       # CI/CD workflows
└── package.json             # Project dependencies and scripts
```

## ⚙️ Configuration

### Playwright Config ([playwright.config.js](playwright.config.js))
- **Browser**: Chromium (headless mode for CI)
- **Timeout**: 30 seconds per test
- **Expect Timeout**: 40 seconds
- **Retries**: 1 (on failure)
- **Screenshot**: Only on failure
- **Trace**: Retain on failure
- **Video**: Retain on failure

### ESLint Config ([.eslintrc.json](.eslintrc.json))
- Enforces code quality
- Prevents common JavaScript errors
- Runs as part of CI pipeline

## 🔧 Development

### Adding New Tests
1. Create test file in `tests/` directory with `.spec.js` extension
2. Follow existing test patterns
3. Use Page Objects from `pageobjects/` directory
4. Tests will automatically run in CI on push/PR

### Running Linter
```bash
# Check code quality
npm run lint

# Note: Lint failures won't block the pipeline
```

## 📈 Test Results

After tests complete:
- **Local**: View reports with `npm run report`
- **CI**: Download artifacts from GitHub Actions workflow run
- **Pull Requests**: Results posted as comments on the PR

## 🐛 Debugging

### Local Debugging
```bash
# Interactive debug mode
npm run test:debug

# Headed mode to see browser
npm run test:headed

# UI mode with test explorer
npm run test:ui
```

### CI Debugging
1. Download test results from CI artifacts
2. Open HTML report to view failures
3. Check video/trace files for visual debugging
4. Review console logs in GitHub Actions workflow output

## 🔐 Environment Variables

Create `.env` file for sensitive data (not tracked in git):
```env
BASE_URL=https://example.com
USERNAME=testuser
PASSWORD=testpass
```

## 📝 Best Practices

1. **Keep tests isolated** - Each test should be independent
2. **Use Page Objects** - Maintain selectors in page object files
3. **Wait properly** - Use Playwright's built-in waiting mechanisms
4. **Name descriptively** - Use clear test descriptions
5. **Screenshot on failure** - Configured automatically in Playwright
6. **Trace retention** - For debugging complex scenarios

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally: `npm run test:ui`
3. Commit with clear messages
4. Push to your branch
5. Open a Pull Request
6. CI pipeline will run automatically
7. Address any failing tests or lint issues

## 📦 Dependencies

- `@playwright/test` - Playwright testing framework
- `@types/node` - Node.js type definitions
- `eslint` - Code quality tool

## 📄 License

ISC

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in `playwright.config.js` |
| Browsers not found | Run `npx playwright install --with-deps` |
| Port conflicts | Change port in test configuration |
| Screenshot missing | Check file permissions in `test-results/` |

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Review test output logs
3. Check Playwright documentation: https://playwright.dev
4. Create a bug report issue with reproduction steps
