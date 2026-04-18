# Playwright CI/CD Pipeline Documentation

## 📋 Overview

This document describes the complete CI/CD pipeline setup for the Playwright automation project using GitHub Actions.

## 🏗️ Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Events                            │
│  (Push, Pull Request, Scheduled)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼──────────┐      ┌──────▼────────────┐
│  Playwright CI   │      │  Test Report      │
│  (playwright.yml)│      │  (test-report.yml)│
└───────┬──────────┘      └──────┬────────────┘
        │                         │
    ┌───┴─────────────┬───────────┴────┐
    │                 │                 │
┌───▼────────┐  ┌────▼──────┐  ┌──────▼──────┐
│ Test Jobs  │  │ Lint Job  │  │ Publish     │
│ (Multi-    │  │ (ESLint)  │  │ Results     │
│ browser)   │  │           │  │             │
└───┬────────┘  └────┬──────┘  └──────┬──────┘
    │                │                 │
┌───▼────────────────▼────────────────▼──┐
│     Artifacts & Reports                │
│ (HTML reports, Videos, Traces)        │
└────────────────────────────────────────┘
```

## 🚀 Workflows

### 1. **Playwright CI** (`.github/workflows/playwright.yml`)

**Purpose**: Main test execution pipeline

**Triggers**:
- Push to `main`, `master`, `develop` branches
- Pull requests to `main`, `master`, `develop` branches
- Daily schedule at 2 AM UTC

**Jobs**:

#### Test Job
- **Matrix Strategy**: Tests on Node.js 18 and 20
- **Steps**:
  1. Checkout code
  2. Setup Node.js with npm caching
  3. Install dependencies
  4. Install Playwright browsers
  5. Run tests
  6. Upload HTML reports (30-day retention)
  7. Upload test results (7-day retention)
  8. Comment PR with results

- **Artifacts Generated**:
  - `playwright-report/` - HTML test report
  - `test-results/` - Video and trace files
  - `test-videos-*` - Test execution videos

#### Lint Job
- Runs ESLint against test files
- Non-blocking (continues even if it fails)
- Helps maintain code quality

**Outputs**:
- Test execution results
- HTML reports
- Videos and traces for debugging
- PR comments with results

### 2. **Test Report** (`.github/workflows/test-report.yml`)

**Purpose**: Aggregates and publishes test results

**Triggers**: Completion of Playwright CI workflow

**Jobs**:
- Downloads all workflow artifacts
- Publishes combined test report
- Comments on PRs with summary

## 📦 Configuration Files

### `playwright.config.js`
- **Browser**: Chromium (headless in CI)
- **Test Directory**: `./tests`
- **Timeout**: 30 seconds per test
- **Retries**: 1 on failure
- **Reporter**: HTML
- **Artifacts**:
  - Screenshots on failure
  - Video on failure
  - Trace on failure

### `package.json` Scripts
```bash
npm run test              # Run tests (headless)
npm run test:ui          # Run in UI mode
npm run test:debug       # Debug mode
npm run test:headed      # Show browser
npm run test:chrome      # Chrome only
npm run test:firefox     # Firefox only
npm run test:webkit      # WebKit only
npm run report           # View HTML report
npm run lint             # Run ESLint
```

### `.eslintrc.json`
Quality standards for test code:
- Prevents unused variables
- Enforces modern JavaScript
- Warns about console usage
- Requires proper variable declarations

### `.github/ISSUE_TEMPLATE/bug_report.md`
Template for reporting test failures with:
- Browser info
- Node.js version
- Reproduction steps
- Error logs/screenshots

## 🔄 CI/CD Flow

### On Push to Main/Master/Develop

```
1. Trigger: Push detected
   ↓
2. Fetch: Code checkout
   ↓
3. Setup: Node.js 18 & 20 (parallel)
   ↓
4. Install: npm dependencies
   ↓
5. Install: Playwright browsers
   ↓
6. Run: Tests for each Node version
   ↓
7. Run: ESLint (non-blocking)
   ↓
8. Upload: Reports & artifacts
   ↓
9. Status: Success/Failure notification
```

### On Pull Request

```
1. Trigger: PR created/updated
   ↓
2. Run: Complete CI pipeline
   ↓
3. Check: All tests pass
   ↓
4. Check: Code quality (linting)
   ↓
5. Post: Results comment on PR
   ↓
6. Gate: Require checks before merge
```

### Scheduled Run (Daily at 2 AM UTC)

```
Validates:
- Tests still pass
- No environment issues
- Browser updates don't break tests
- Detects flaky tests
```

## 📊 Artifacts Management

| Artifact | Retention | Purpose |
|----------|-----------|---------|
| `playwright-report/` | 30 days | Detailed HTML report with results |
| `test-results/` videos | 7 days | Video recordings of test execution |
| `test-results/` traces | 7 days | Playwright traces for debugging |
| `test-results/` logs | 7 days | Console and error logs |

## 🔍 Debugging Failed Tests

### In GitHub Actions UI

1. Go to Actions tab
2. Click on failed workflow run
3. Click on failed job
4. Scroll to "Artifacts" section
5. Download reports/videos

### Viewing Results

| File | How to View |
|------|------------|
| HTML Report | Download & open in browser |
| Videos | Download & play in video player |
| Traces | Use `npm run trace` locally |
| Logs | View in GitHub Actions output |

## ⚙️ Environment Variables in CI

These variables are available during CI runs:

```
CI=true                    # Playwright detects CI environment
NODE_ENV=test              # Test environment
GITHUB_ACTIONS=true        # GitHub Actions specific
GITHUB_REF=refs/heads/...  # Git reference
GITHUB_SHA=...             # Commit SHA
```

## 🔐 Secrets Management

For sensitive data (API keys, passwords):

1. Add to GitHub Secrets: Settings → Secrets and Variables
2. Reference in workflow: `${{ secrets.SECRET_NAME }}`
3. Use in tests: `process.env.SECRET_NAME`

Example:
```yaml
# In workflow
env:
  API_KEY: ${{ secrets.API_KEY }}

# In test
const apiKey = process.env.API_KEY;
```

## 🚨 Common Issues & Solutions

### Issue: "Browsers not found"
**Solution**: Install step uses `--with-deps` flag
```bash
npx playwright install --with-deps
```

### Issue: Tests timeout in CI
**Solution**: 
- Increase timeout in `playwright.config.js`
- Check network/server availability
- Use explicit waits

### Issue: Flaky tests
**Solution**:
- Use Playwright's auto-waiting
- Remove hardcoded `waitForTimeout()`
- Check for race conditions

### Issue: Artifacts not uploading
**Solution**:
- Check if `if: always()` is set
- Verify file paths exist
- Check artifact size limits

## 📈 Performance Monitoring

The pipeline provides metrics:

- **Test Duration**: Time per test
- **Retry Rate**: How often tests retry
- **Success Rate**: Overall pass percentage
- **Browser Coverage**: Results across Node versions

## 🔗 Integration Points

### GitHub UI
- PR status checks
- Artifact downloads
- Workflow visualization

### External Tools (Optional)
- Slack notifications
- Email alerts
- Dashboard integration
- Test tracking systems

## 📚 Related Files

- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development guide
- [.env.example](../.env.example) - Environment variables
- [playwright.config.js](../playwright.config.js) - Test configuration
- [package.json](../package.json) - Dependencies & scripts

## 🎯 Best Practices

1. **Keep tests parallel** - Faster execution
2. **Fail fast** - Stop on first failure group
3. **Artifact cleanup** - Set retention periods
4. **Test isolation** - No dependencies between tests
5. **Clear naming** - Identify issues quickly
6. **Logging** - Add console output for debugging

## 🚀 Extending the Pipeline

### Add Email Notifications
```yaml
- name: Send email on failure
  if: failure()
  uses: dawidd6/action-send-mail@v3
```

### Add Slack Notifications
```yaml
- name: Slack notification
  if: always()
  uses: slackapi/slack-github-action@v1.24.0
```

### Add Test Coverage Reports
```yaml
- name: Coverage report
  run: npx playwright test --reporter=coverage
```

### Add Security Scanning
```yaml
- name: Security scan
  run: npm audit
```

## 📞 Support & Troubleshooting

1. Check GitHub Actions logs
2. Review workflow file syntax
3. Test locally first
4. Check Playwright documentation
5. Open GitHub issue with logs

---

**Last Updated**: April 2026
**Version**: 1.0
