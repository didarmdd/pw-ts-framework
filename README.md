# Playwright + TypeScript Automation Framework

## Overview

This repository contains a scalable, enterprise ready test automation framework built using Playwright and TypeScript.

The framework supports real organisational needs, including:

- UI testing
- API testing
- End to end testing
- Authentication with password, SSO, and 2FA
- CI/CD with GitLab
- Reporting with Playwright HTML and Allure
- Notifications via Slack and Microsoft Teams
- Hosted reports using GitLab Pages

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitLab CI/CD
- Allure Reporting
- Slack Webhooks
- Microsoft Teams Webhooks

---

## Project Structure

    ├── env/                         # Environment configuration files
    │   ├── dev.env
    │   ├── stg.env
    │   └── prod.env
    │
    ├── src/
    │   ├── config/                  # Global configuration
    │   │   ├── env.ts
    │   │   ├── endpoints.ts
    │   │   └── urls.ts
    │   │
    │   ├── core/                    # Framework core logic
    │   │   ├── api/                 # API client and helpers
    │   │   ├── ui/                  # UI base classes and auth logic
    │   │   └── logger.ts
    │   │
    │   ├── fixtures/                # Playwright fixtures
    │   │   └── testFixtures.ts
    │   │
    │   ├── pages/                   # Page Object Model (selectors + actions)
    │   │
    │   ├── tests/
    │   │   ├── api/                 # API tests
    │   │   ├── ui/                  # UI tests
    │   │   └── e2e/                 # End to end tests
    │   │
    │   ├── utils/                   # Utility helpers
    │   └── data/                    # Test data
    │
    ├── artifacts/                   # Test output (ignored by git)
    │
    ├── scripts/                     # Helper scripts (auth bootstrap, etc.)
    │
    ├── docs/                        # Additional documentation
    │
    ├── playwright.config.ts         # Playwright configuration
    ├── package.json
    ├── tsconfig.json
    └── .gitlab-ci.yml

---

## Test Types Supported

### UI Tests

- Browser based testing
- Page Object Model
- Stable selectors using data-testid
- Session reuse using storageState

### API Tests

- CRUD testing
- Token or header based authentication
- Fast and CI friendly execution

### End to End Tests

- API creates test data
- UI verifies behaviour
- API cleans up data
- Reliable, low flakiness flows

---

## Authentication Support (Including 2FA)

This framework is designed to handle real enterprise authentication flows.

Supported authentication modes:

    AUTH_MODE=password
    AUTH_MODE=sso
    AUTH_MODE=otp_email
    AUTH_MODE=otp_totp

---

## Running Tests Locally

### Install dependencies

    npm install
    npx playwright install

### Setup Environment

1.  Copy the example environment file:
    ```bash
    cp env/.env.example env/dev.env
    ```
2.  Open `env/dev.env` and fill in your OBP credentials (`OBP_USERNAME`, `OBP_PASSWORD`, `OBP_CONSUMER_KEY`).

### Run smoke tests

    ENV=dev npm run test:smoke

### Run all tests

    ENV=dev npm run test

### Run UI tests only

    ENV=dev npm run test:ui

### Run API tests only

    ENV=dev npm run test:api

---

## Reporting

### Playwright HTML Report

Automatically generated and includes screenshots, videos, and traces.

Location:

    artifacts/playwright-report

Open locally:

    npm run report

---

### Allure Report

Provides better visualisation, trends, and attachments.

Generate report:

    npm run allure:generate

Open report:

    npm run allure:open
