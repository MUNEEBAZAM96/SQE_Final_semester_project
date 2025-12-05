# Cypress Test Execution Instructions

## Prerequisites

Before running Cypress tests, you **MUST** have both servers running:

1. **Backend Server** (Port 5000)
2. **Frontend Server** (Port 3000)

## Quick Start

### Option 1: Manual Server Start (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin/frontend
npm start
```

**Terminal 3 - Run Cypress Tests:**
```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin/frontend
npm run cypress:run
```

### Option 2: Using the Helper Script

```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin
./run-cypress-tests.sh
```

## Test Files

All Cypress test files are located in `frontend/cypress/e2e/`:

1. **add-admin-form.cy.js** - Admin form tests (19 test cases)
2. **add-customer-form.cy.js** - Customer form tests (20 test cases)
3. **add-customer-selectcustomer.cy.js** - SelectCustomer form tests (21 test cases)
4. **add-lead-form.cy.js** - Lead form tests (25 test cases)
5. **add-product-form.cy.js** - Product form tests (18 test cases)
6. **login-form.cy.js** - Login form tests (20 test cases)
7. **signup-form.cy.js** - Signup/Register API tests (25 test cases)

**Total: 148 test cases**

## Running Tests

### Run All Tests (Headless)
```bash
cd frontend
npm run cypress:run
```

### Open Cypress GUI (Interactive)
```bash
cd frontend
npm run cypress:open
```

### Run Specific Test File
```bash
cd frontend
npx cypress run --spec "cypress/e2e/login-form.cy.js"
```

## Test Results

- **Screenshots**: Saved to `frontend/cypress/screenshots/`
- **Videos**: Saved to `frontend/cypress/videos/` (if enabled)
- **Reports**: Displayed in terminal output

## Troubleshooting

### Tests Fail with "Cannot find element"
- **Solution**: Ensure both backend (port 5000) and frontend (port 3000) servers are running

### Tests Fail with "Network Error"
- **Solution**: Check backend server is running and accessible at `http://localhost:5000`

### Tests Fail with "Login failed"
- **Solution**: Ensure backend has the default admin user:
  - Email: `admin@demo.com`
  - Password: `123456`

### Port Already in Use
- **Solution**: Stop existing processes:
  ```bash
  # Kill process on port 3000
  lsof -ti:3000 | xargs kill -9
  
  # Kill process on port 5000
  lsof -ti:5000 | xargs kill -9
  ```

## Default Test Credentials

- **Email**: `admin@demo.com`
- **Password**: `123456`

These credentials are used by the `cy.login()` custom command in all form tests.

## Screenshot Locations

Screenshots are automatically captured for each test case:
- Before submit: `TC-XX-Before-Submit-{timestamp}.png`
- After submit: `TC-XX-After-Submit-{timestamp}.png`
- Error cases: `TC-XX-After-Submit-Error-{timestamp}.png`

Location: `frontend/cypress/screenshots/`

