# Cypress E2E Testing Setup

## Overview
Cypress has been set up for end-to-end testing of the MERN Admin frontend application.

## Installation
Cypress is already installed as a dev dependency:
```bash
npm install --save-dev cypress --legacy-peer-deps
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
cd frontend
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- Select a browser (Chrome, Electron, Firefox)
- Run tests interactively
- See test execution in real-time

### Run Tests Headless (CI Mode)
```bash
cd frontend
npm run cypress:run
```
This runs all tests in headless mode, suitable for CI/CD pipelines.

### Run Specific Test File
```bash
cd frontend
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Test Files Structure

```
frontend/
├── cypress/
│   ├── e2e/                    # E2E test files
│   │   ├── login.cy.js         # Login page tests
│   │   ├── navigation.cy.js    # Navigation tests
│   │   ├── admin-crud.cy.js    # Admin CRUD tests
│   │   ├── customer-crud.cy.js # Customer CRUD tests
│   │   ├── lead-crud.cy.js     # Lead CRUD tests
│   │   └── product-crud.cy.js   # Product CRUD tests
│   ├── fixtures/               # Test data fixtures
│   │   └── example.json
│   ├── support/                # Support files
│   │   ├── commands.js         # Custom Cypress commands
│   │   └── e2e.js             # Global configuration
│   └── screenshots/            # Screenshots (on failure)
│   └── videos/                 # Test videos (if enabled)
├── cypress.config.js          # Cypress configuration
└── .cypressignore             # Files to ignore
```

## Custom Commands

### `cy.login(email, password)`
Login a user with credentials:
```javascript
cy.login('admin@demo.com', '123456')
```

### `cy.logout()`
Logout the current user:
```javascript
cy.logout()
```

### `cy.navigateTo(path)`
Navigate to a specific route:
```javascript
cy.navigateTo('/admin')
```

## Configuration

The Cypress configuration is in `cypress.config.js`:
- **Base URL:** `http://localhost:3000`
- **Viewport:** 1280x720
- **Video:** Disabled (for faster tests)
- **Screenshots:** Enabled on failure
- **Timeout:** 10 seconds

## Prerequisites for Running Tests

1. **Backend Server:** Must be running on `http://localhost:8888`
   ```bash
   npm start  # In root directory
   ```

2. **Frontend Server:** Must be running on `http://localhost:3000`
   ```bash
   cd frontend
   npm start
   ```

3. **MongoDB:** Must be running and accessible

## Default Test Credentials

- **Email:** `admin@demo.com`
- **Password:** `123456`

## CI/CD Integration

Cypress tests are automatically run in GitHub Actions CI/CD pipeline:
- Tests run in headless mode
- Backend and frontend servers are started automatically
- Screenshots and videos are uploaded as artifacts on failure

## Writing New Tests

1. Create a new test file in `cypress/e2e/`
2. Use the `.cy.js` extension
3. Follow the existing test structure:

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.login() // Login before each test
  })

  it('should do something', () => {
    // Test implementation
  })
})
```

## Troubleshooting

### Tests fail with "Cannot connect to server"
- Ensure backend is running on port 8888
- Ensure frontend is running on port 3000
- Check MongoDB connection

### Tests timeout
- Increase timeout in `cypress.config.js`
- Check if servers are responding: `curl http://localhost:3000`

### Cypress can't find elements
- Use `cy.wait()` to wait for elements to load
- Check if selectors match actual DOM structure
- Use Cypress Test Runner to inspect elements

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Examples](https://example.cypress.io/)

