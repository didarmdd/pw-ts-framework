# Playwright TypeScript framework guide

## Quick start

1. Install
   npm i
   npx playwright install

2. Create env file
   Copy env/dev.env.example to env/dev.env and update values

3. Run smoke
   ENV=dev npm run test:smoke

## Auth handling

### Password auth

Set AUTH_MODE=password in env file, and provide USERNAME and PASSWORD.

Selectors are placeholders using data-testid:
login-username
login-password
login-submit

Update these selectors to match your app.

The framework will auto create storageState on first run if none exists.

### SSO auth

Set AUTH_MODE=sso.

Generate storageState once locally:
ENV=dev npm run auth:state

Then commit nothing sensitive.
Keep artifacts/auth in gitignore.
In CI, you can inject storageState via secure artifact or secret store based on org policy.

## Test layout

src/tests/ui contains UI tests
src/tests/api contains API tests
src/tests/e2e contains combined flows

Tagging examples
@smoke @ui
@smoke @api
@e2e

## CI pattern

PR
run api smoke and ui smoke

Nightly
run full regression

Artifacts
upload artifacts/playwright-report and artifacts/test-results
