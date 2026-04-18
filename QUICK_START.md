# ⚡ Quick Start Guide - Playwright CI Pipeline

Get your CI pipeline up and running in minutes!

## 🎯 What You Get

✅ Automated testing on push & pull requests  
✅ Multi-browser testing (Node.js 18 & 20)  
✅ Code quality checks with ESLint  
✅ HTML test reports  
✅ Video recordings & traces for debugging  
✅ Daily scheduled test runs  
✅ PR comments with test results  

## 📋 Prerequisites

- GitHub repository (public or private)
- Node.js 18+ installed locally
- npm 9+ installed locally

## 🚀 Setup in 5 Minutes

### Step 1: Verify Local Setup
```bash
npm install
npx playwright install --with-deps
```

### Step 2: Test Local Execution
```bash
npm run test
# All tests should pass
```

### Step 3: Push to GitHub
```bash
git add .
git commit -m "ci: setup playwright ci pipeline"
git push origin main
```

### Step 4: Verify GitHub Actions
1. Go to your GitHub repository
2. Click on **Actions** tab
3. You should see **Playwright CI** workflow running
4. Wait for completion (5-10 minutes)

### Step 5: View Results
- Click on the completed workflow
- Download artifacts:
  - `playwright-report-node-*` - HTML Report
  - `test-results-node-*` - Videos & Traces
  - `test-videos-node-*` - Video recordings

## 📁 Files Created/Modified

### New Workflows
- `.github/workflows/playwright.yml` - Main CI pipeline
- `.github/workflows/test-report.yml` - Results aggregation

### Configuration
- `package.json` - Test scripts added
- `playwright.config.js` - CI optimizations
- `.eslintrc.json` - Code quality rules
- `.env.example` - Environment variable template

### Documentation
- `README.md` - Project overview
- `CONTRIBUTING.md` - Development guide
- `CI_PIPELINE_DOCUMENTATION.md` - Detailed pipeline docs
- `QUICK_START.md` - This file!

## 🧪 Running Tests Locally

Before pushing, test locally:

```bash
# Run in headless mode (like CI)
npm run test

# Run in UI mode (interactive)
npm run test:ui

# Run in debug mode (step-by-step)
npm run test:debug

# View HTML report
npm run report
```

## 🔧 Common Tasks

### Adding a New Test
1. Create file in `tests/my-test.spec.js`
2. Write your test
3. Run locally: `npm run test:ui`
4. Push to GitHub (CI runs automatically)

### Running Linter
```bash
npm run lint
# Checks code quality
```

### Viewing Old Test Reports
1. Go to GitHub Actions
2. Click on workflow run
3. Download `playwright-report-*` artifact
4. Extract and open `index.html`

### Debugging a Failed Test
1. Go to failed GitHub Actions run
2. Download `test-results-*` artifact
3. Check videos and traces
4. Run locally: `npm run test:debug`

## 📊 CI Pipeline Status

Check your workflow status:

```
Repository → Actions → Playwright CI
```

Status indicators:
- ✅ **Green** - All tests passed
- ❌ **Red** - Tests or lint failed
- ⏳ **Yellow** - Currently running

## 🔐 Adding Secrets (Passwords, API Keys)

If your tests need sensitive data:

1. Go to GitHub: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add: `Name: API_KEY`, `Value: your_key_here`
4. Use in tests: `process.env.API_KEY`
5. Reference in workflow as: `${{ secrets.API_KEY }}`

## 📈 Next Steps

### Customize the Pipeline
Edit `.github/workflows/playwright.yml` to:
- Change trigger events (push, schedule, etc.)
- Adjust retention days for artifacts
- Add email/Slack notifications
- Add more browsers

### Add More Tests
1. Create test files in `tests/`
2. Use Page Objects from `pageobjects/`
3. Follow naming conventions
4. Tests run automatically on push

### Monitor Test Results
1. Watch GitHub Actions dashboard
2. Download and review reports
3. Track test trends over time
4. Tag flaky tests for investigation

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow not running | Check GitHub Actions enabled in repo settings |
| Tests fail in CI but pass locally | Check environment variables, timeouts |
| Browsers not found | CI installs them automatically |
| Artifacts not downloading | Check job didn't time out |
| PR comments not showing | Workflow needs `pull-request` permissions |

## 📚 Documentation

- **Full Setup Guide**: [README.md](README.md)
- **Development Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Pipeline Details**: [CI_PIPELINE_DOCUMENTATION.md](CI_PIPELINE_DOCUMENTATION.md)
- **Playwright Docs**: [playwright.dev](https://playwright.dev)

## 🎓 Learn More

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

### Playwright
- [Playwright Testing](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)

## ✅ Verification Checklist

After setup, verify:

- [ ] Workflow file exists: `.github/workflows/playwright.yml`
- [ ] Tests run locally: `npm run test`
- [ ] GitHub Actions is enabled
- [ ] First workflow run completed
- [ ] Artifacts are generated
- [ ] HTML report is viewable
- [ ] Lint check is running
- [ ] PR comments are posted

## 🎉 You're All Set!

Your Playwright CI pipeline is now live! 

### What happens next:

1. **Push to main/develop** → Tests run automatically
2. **Create a PR** → Tests run + results commented
3. **Every day at 2 AM UTC** → Tests run automatically
4. **Test failure** → ❌ Check status in GitHub
5. **Test success** → ✅ Merge with confidence!

---

**Need help?** Check the [README.md](README.md) or [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guides.

**Happy testing! 🚀**
