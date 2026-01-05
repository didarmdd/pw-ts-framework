# Writing tests

## Rules

Use data-testid first
Keep tests independent
Prefer fixtures, avoid repeated setup code
Use API to seed data for UI tests when possible
Avoid fixed waits

## Naming

File naming
something.ui.spec.ts
something.api.spec.ts
something.e2e.spec.ts

Tags
@smoke
@regression
@ui
@api
@e2e

## Adding a new API module

Create a typed helper inside src/core/api and call it from tests.

## Adding a new page

Create src/pages/MyPage.ts and expose locators and actions.
