// @ts-check
import {chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

// Detect CI environment
const isCI = !!process.env.CI;

const config = ({
  testDir: './tests',
  retries: isCI ? 2 : 1,
  timeout: 30*1000,
  expect:{
    timeout:40*1000,
  },
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    browserName: 'chromium',
    headless: isCI ? true : false,  // Headless in CI, headed locally
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: isCI ? 'retain-on-failure' : 'off',
  },

  // Configure workers for CI (parallel execution)
  workers: isCI ? 4 : 1,

  // Timeout for entire test suite
  timeout: 30 * 1000,
  globalTimeout: 30 * 60 * 1000,
  
});

module.exports = config
