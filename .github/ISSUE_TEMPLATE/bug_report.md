name: Bug Report
description: Report a test failure or bug in the automation suite
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: "## Bug Report"
      
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear description of the bug or test failure
      placeholder: "The test fails when..."
    validations:
      required: true
      
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      placeholder: |
        1. Run `npm test`
        2. Test fails at...
      value: |
        1. 
        2. 
    validations:
      required: true
      
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      placeholder: "The test should..."
    validations:
      required: true
      
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      placeholder: "Instead, it..."
    validations:
      required: true
      
  - type: dropdown
    id: browser
    attributes:
      label: Browser
      options:
        - Chromium
        - Firefox
        - WebKit
        - All
    validations:
      required: true
      
  - type: input
    id: playwright-version
    attributes:
      label: Playwright Version
      placeholder: "e.g., 1.57.0"
    validations:
      required: true
      
  - type: input
    id: node-version
    attributes:
      label: Node.js Version
      placeholder: "e.g., 18.x"
    validations:
      required: true
      
  - type: textarea
    id: logs
    attributes:
      label: Error Logs/Screenshots
      description: Attach error logs, screenshots, or video recordings if available
      
  - type: checkbox
    id: existing-issue
    attributes:
      label: I have checked similar issues before submitting
      required: true
