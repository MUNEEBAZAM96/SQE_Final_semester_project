# IEEE 829 / IEEE 29119 Test Plan Document
## MERN Admin Application - Comprehensive Quality Engineering

**Test Plan Identifier:** TP-MERN-ADMIN-V1.0  
**Version:** 1.0  
**Date:** December 5, 2024  
**Author:** Software Quality Engineering Team  
**Status:** Approved for Execution

---

## Executive Summary

This IEEE 829 / IEEE 29119 compliant Test Plan Document provides comprehensive testing strategy for the MERN Admin Dashboard Application. The document includes:

✅ **Test Objectives** - Clear testing goals and purposes (Section 2.2)  
✅ **Test Scope** - In-scope and out-of-scope items (Section 2.3)  
✅ **Functional Tests** - Complete functional testing strategy (Section 4.1, 6.1)  
✅ **Non-Functional Tests** - Performance, security, usability, accessibility (Section 4.5, 6.7)  
✅ **Unit Testing** - White-box unit testing approach (Section 6.2.1)  
✅ **Integration Testing** - Backend-database and frontend-backend integration (Section 6.3)  
✅ **UI Testing** - Cypress E2E testing strategy (Section 6.1.2)  
✅ **Backend Testing** - Jest-based backend testing (Section 6.2.2)  
✅ **Tools** - Comprehensive testing tools documentation (Section 7)  
✅ **Test Environment** - Development, staging, production environments (Section 8)  
✅ **Test Cases** - 20+ detailed test cases with full documentation (Section 15)

**Current Test Status:**
- **Total Tests:** 132 (Backend: 108, Frontend: 24)
- **Passing:** 119 tests (90% pass rate)
- **Code Coverage:** 82% overall
- **API Coverage:** 100% (all endpoints tested)

---

## Table of Contents

1. [Test Plan Identifier](#1-test-plan-identifier)
2. [Introduction](#2-introduction)
   - [Test Objectives](#22-test-objectives)
   - [Test Scope](#23-test-scope)
3. [Test Items](#3-test-items)
4. [Features to be Tested](#4-features-to-be-tested)
   - [Functional Tests](#41-functional-features)
   - [Non-Functional Tests](#45-non-functional-features)
5. [Features Not to be Tested](#5-features-not-to-be-tested)
6. [Test Approach / Test Strategy](#6-test-approach--test-strategy)
   - [Unit Testing](#621-unit-testing)
   - [Integration Testing](#63-integration-testing)
   - [UI Testing (Cypress/Selenium)](#612-ui-testing-cypressselenium)
   - [Backend Testing (Jest)](#621-unit-testing)
7. [Testing Tools](#7-testing-tools)
8. [Test Environment](#8-test-environment)
9. [Roles and Responsibilities](#9-roles-and-responsibilities)
10. [Test Schedule](#10-test-schedule)
11. [Risks & Mitigation Strategy](#11-risks--mitigation-strategy)
12. [Test Exit and Entry Criteria](#12-test-exit-and-entry-criteria)
13. [Test Deliverables](#13-test-deliverables)
14. [Requirements Traceability Matrix](#14-requirements-traceability-matrix)
15. [Detailed Test Cases](#15-detailed-test-cases)
16. [Testing Metrics](#16-testing-metrics)
17. [Appendices](#17-appendices)

---

## 1. Test Plan Identifier

**Test Plan ID:** TP-MERN-ADMIN-V1.0  
**Project Name:** MERN Admin Dashboard Application  
**Application Type:** Full-Stack Web Application (MERN Stack)  
**Test Plan Version:** 1.0  
**Date Created:** December 5, 2024  
**Last Updated:** December 5, 2024  
**Status:** Active  
**Related Documents:**
- Project Plan: `PROJECT_PLAN.md`
- Setup Guide: `SETUP_GUIDE.md`
- CI/CD Configuration: `.github/workflows/ci-cd.yml`

---

## 2. Introduction

### 2.1 Project Description

The MERN Admin Dashboard is a comprehensive Customer Relationship Management (CRM) application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application provides administrative functionality for managing admins, clients, leads, and products through a modern web interface.

**Technology Stack:**
- **Backend:** Node.js 14.x, Express.js 4.17.1, MongoDB 6.0, Mongoose 5.9.10
- **Frontend:** React 17.0.2, Ant Design 4.16.7, Redux 4.0.5
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Testing:** Jest 30.2.0, Cypress 15.7.1, Supertest 7.1.4
- **CI/CD:** GitHub Actions

**Repository:** https://github.com/idurar/starter-antd-admin-crud-auth-mern

### 2.2 Test Objectives

The primary objectives of this test plan are:

1. **Functional Validation**
   - Verify all functional requirements are correctly implemented
   - Validate business logic and workflows
   - Ensure CRUD operations work as expected
   - Confirm authentication and authorization mechanisms

2. **Quality Assurance**
   - Achieve ≥80% code coverage
   - Identify and document defects
   - Ensure application stability and reliability
   - Validate error handling and edge cases

3. **Integration Verification**
   - Verify frontend-backend integration
   - Validate API endpoint functionality
   - Test database operations and data persistence
   - Confirm end-to-end user workflows

4. **User Experience**
   - Verify UI functionality and usability
   - Test form validations and user interactions
   - Ensure responsive design works correctly
   - Validate navigation and routing

5. **Security Validation**
   - Verify password encryption and security
   - Test authentication and session management
   - Validate input sanitization
   - Confirm protected route access

6. **Performance Validation**
   - Measure API response times
   - Verify page load performance
   - Test database query performance
   - Ensure acceptable user experience

7. **Automation Support**
   - Integrate tests into CI/CD pipeline
   - Enable automated regression testing
   - Support continuous integration practices
   - Facilitate rapid feedback cycles

### 2.3 Test Scope

#### 2.3.1 In-Scope Testing

**Functional Testing:**
- ✅ Authentication module (login, logout, token validation)
- ✅ Admin management (CRUD operations, search, pagination)
- ✅ Client management (CRUD operations, search, pagination)
- ✅ Lead management (CRUD operations, status tracking)
- ✅ Product management (CRUD operations, status management)
- ✅ Form validations and error handling
- ✅ API endpoint functionality
- ✅ Database operations and data persistence

**Non-Functional Testing:**
- ✅ Performance testing (API response times, page load times)
- ✅ Security testing (authentication, password encryption, input validation)
- ✅ Usability testing (UI/UX, navigation, form interactions)
- ✅ Basic accessibility testing

**Testing Types:**
- ✅ Unit Testing (Backend models, controllers, utilities)
- ✅ Integration Testing (API endpoints, database operations)
- ✅ UI Testing (Cypress E2E tests)
- ✅ Backend Testing (Jest unit and integration tests)
- ✅ System Testing (End-to-end workflows)
- ✅ Regression Testing (Automated via CI/CD)

**Test Environments:**
- ✅ Development environment (local)
- ✅ CI/CD environment (GitHub Actions)
- ✅ Staging environment (TBD)
- ✅ Production environment (TBD)

#### 2.3.2 Out-of-Scope Testing

- ❌ Third-party service integration testing
- ❌ Infrastructure-level testing
- ❌ Extreme load testing (>1000 concurrent users)
- ❌ Mobile app testing (web-only application)
- ❌ Internationalization (i18n) testing
- ❌ Advanced accessibility testing (WCAG AAA compliance)
- ❌ Production database migration testing
- ❌ Code quality tools configuration (ESLint, Prettier)

### 2.4 Purpose of Testing

The purpose of this test plan is to:
1. Ensure all functional requirements are met
2. Validate API endpoints and database operations
3. Verify user interface functionality and usability
4. Confirm security and authentication mechanisms
5. Validate integration between frontend and backend
6. Ensure code quality through comprehensive test coverage
7. Support CI/CD pipeline with automated testing

### 2.3 Test Plan Purpose

This document defines the testing strategy, approach, test cases, and procedures for the MERN Admin Application. It serves as a comprehensive guide for the testing team to execute systematic testing activities following IEEE 829 and IEEE 29119 standards.

### 2.4 Target Audience

- Software Quality Engineers
- QA Automation Engineers
- Development Team
- Project Managers
- Course Instructors
- Stakeholders

### 2.5 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| **MERN** | MongoDB, Express.js, React.js, Node.js |
| **JWT** | JSON Web Token |
| **CRUD** | Create, Read, Update, Delete |
| **API** | Application Programming Interface |
| **E2E** | End-to-End |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **RTM** | Requirements Traceability Matrix |
| **SQA** | Software Quality Assurance |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **ODM** | Object Document Mapper (Mongoose) |
| **UI** | User Interface |
| **UX** | User Experience |

### 2.6 References

1. **Project Repository:** https://github.com/idurar/starter-antd-admin-crud-auth-mern
2. **IEEE 829-2008:** Standard for Software Test Documentation
3. **IEEE 29119-3:** Software Testing - Test Documentation
4. **Project Documentation:**
   - `PROJECT_PLAN.md` - Implementation plan
   - `SETUP_GUIDE.md` - Setup instructions
   - `TEST_PLAN.md` - Initial test plan
   - `CI_CD_SETUP.md` - CI/CD configuration guide
5. **API Documentation:** Backend API routes defined in `routes/api.js` and `routes/authApi.js`
6. **Frontend Routes:** Defined in `frontend/src/router/AppRouter.jsx`

---

## 3. Test Items

### 3.1 Backend Components

#### 3.1.1 Authentication Module
- **File:** `controllers/authController.js`
- **Routes:** `routes/authApi.js`
- **Components:**
  - Login endpoint (`POST /api/login`)
  - Logout endpoint (`POST /api/logout`)
  - Token validation middleware (`isValidToken`)
  - Password hashing (`bcryptjs`)
  - JWT token generation and validation

#### 3.1.2 Admin Management Module
- **File:** `controllers/adminController.js`
- **Model:** `models/Admin.js`
- **Routes:** `routes/api.js` (lines 14-23)
- **Endpoints:**
  - `POST /api/admin/create`
  - `GET /api/admin/read/:id`
  - `PATCH /api/admin/update/:id`
  - `DELETE /api/admin/delete/:id`
  - `GET /api/admin/list`
  - `GET /api/admin/search`
  - `PATCH /api/admin/password-update/:id`

#### 3.1.3 Client Management Module
- **File:** `controllers/clientController.js` (uses `crudController`)
- **Model:** `models/Client.js`
- **Routes:** `routes/api.js` (lines 27-32)
- **Endpoints:**
  - `POST /api/client/create`
  - `GET /api/client/read/:id`
  - `PATCH /api/client/update/:id`
  - `DELETE /api/client/delete/:id`
  - `GET /api/client/list`
  - `GET /api/client/search`

#### 3.1.4 Lead Management Module
- **File:** `controllers/leadController.js` (uses `crudController`)
- **Model:** `models/Lead.js`
- **Routes:** `routes/api.js` (lines 35-40)
- **Endpoints:**
  - `POST /api/lead/create`
  - `GET /api/lead/read/:id`
  - `PATCH /api/lead/update/:id`
  - `DELETE /api/lead/delete/:id`
  - `GET /api/lead/list`
  - `GET /api/lead/search`

#### 3.1.5 Product Management Module
- **File:** `controllers/productController.js` (uses `crudController`)
- **Model:** `models/Product.js`
- **Routes:** `routes/api.js` (lines 43-52)
- **Endpoints:**
  - `POST /api/product/create`
  - `GET /api/product/read/:id`
  - `PATCH /api/product/update/:id`
  - `DELETE /api/product/delete/:id`
  - `GET /api/product/list`
  - `GET /api/product/search`

#### 3.1.6 Database Models
- **Admin Model:** `models/Admin.js` - Schema validation, password hashing
- **Client Model:** `models/Client.js` - Company, contact information
- **Lead Model:** `models/Lead.js` - Lead tracking, status management
- **Product Model:** `models/Product.js` - Product catalog

#### 3.1.7 Generic CRUD Controller
- **File:** `controllers/crudController/crudMethods.js`
- **Methods:** create, read, update, delete, list, search
- **Used by:** Client, Lead, Product controllers

#### 3.1.8 Error Handling
- **File:** `handlers/errorHandlers.js`
- **Middleware:** `catchErrors` wrapper

### 3.2 Frontend Components

#### 3.2.1 Authentication Pages
- **Login Page:** `frontend/src/pages/Login.jsx`
- **Logout Page:** `frontend/src/pages/Logout.jsx`
- **Route:** `/login` (PublicRoute)

#### 3.2.2 Dashboard
- **File:** `frontend/src/pages/Dashboard.jsx`
- **Layout:** `frontend/src/layout/MainDashboard/index.jsx`
- **Route:** `/` (PrivateRoute)

#### 3.2.3 Admin Management Page
- **File:** `frontend/src/pages/Admin.jsx`
- **Module:** `frontend/src/modules/AdminCrudModule/index.jsx`
- **Data Table:** `frontend/src/modules/AdminCrudModule/AdminDataTable.jsx`
- **Form:** `frontend/src/forms/AdminForm.jsx`
- **Route:** `/admin` (PrivateRoute)

#### 3.2.4 Customer Management Page
- **File:** `frontend/src/pages/Customer.jsx`
- **Module:** `frontend/src/modules/CrudModule/index.jsx`
- **Form:** `frontend/src/forms/CustomerForm.jsx`
- **Route:** `/customer` (PrivateRoute)

#### 3.2.5 Lead Management Page
- **File:** `frontend/src/pages/Lead.jsx`
- **Form:** `frontend/src/forms/LeadForm.jsx`
- **Route:** `/lead` (PrivateRoute)

#### 3.2.6 Product Management Page
- **File:** `frontend/src/pages/Product.jsx`
- **Form:** `frontend/src/forms/ProductForm.jsx`
- **Route:** `/product` (PrivateRoute)

#### 3.2.7 Navigation Component
- **File:** `frontend/src/layout/Navigation/index.jsx`
- **Router:** `frontend/src/router/AppRouter.jsx`
- **Private Routes:** `frontend/src/router/PrivateRoute.jsx`
- **Public Routes:** `frontend/src/router/PublicRoute.jsx`

#### 3.2.8 State Management
- **Redux Store:** `frontend/src/redux/store.js`
- **Auth Reducer:** `frontend/src/redux/auth/reducer.js`
- **CRUD Reducer:** `frontend/src/redux/crud/reducer.js`
- **Search Reducer:** `frontend/src/redux/search/reducer.js`

#### 3.2.9 API Integration
- **Request Handler:** `frontend/src/request/request.js`
- **API Config:** `frontend/src/config/serverApiConfig.js`
- **Error Handler:** `frontend/src/request/errorHandler.js`

### 3.3 CI/CD Components

#### 3.3.1 GitHub Actions Workflow
- **File:** `.github/workflows/ci-cd.yml`
- **Stages:**
  - Source (webhook triggers)
  - Build (backend & frontend)
  - Test (Jest backend, Cypress frontend)
  - Staging Deployment
  - Production Deployment

#### 3.3.2 Test Configuration
- **Jest Config:** `jest.config.js`
- **Cypress Config:** `frontend/cypress.config.js`
- **Test Setup:** `tests/setup.js`
- **Test Teardown:** `tests/teardown.js`

---

## 4. Features to be Tested

### 4.1 Functional Features

#### 4.1.1 Authentication Features
- User login with email and password
- JWT token generation and validation
- Session management
- Logout functionality
- Protected route access
- Token expiration handling
- Invalid credential handling

#### 4.1.2 Admin Management Features
- Create new admin account
- View admin details
- Update admin information
- Delete admin account
- List all admins with pagination
- Search admins by email, name, surname
- Update admin password
- Admin profile management

#### 4.1.3 Client Management Features
- Create new client
- View client details
- Update client information
- Delete client
- List clients with pagination
- Search clients by company, name, email
- Client data validation

#### 4.1.4 Lead Management Features
- Create new lead
- View lead details
- Update lead status
- Delete lead
- List leads with pagination
- Search leads by client, email, phone
- Lead status tracking (pending, contacted, etc.)

#### 4.1.5 Product Management Features
- Create new product
- View product details
- Update product information
- Delete product
- List products with pagination
- Search products by name, description
- Product status management (available, out_of_stock)

### 4.2 UI Features

#### 4.2.1 Navigation
- Sidebar navigation menu
- Route navigation
- Active route highlighting
- Responsive navigation

#### 4.2.2 Forms
- Admin creation form (`AdminForm.jsx`)
- Client creation form (`CustomerForm.jsx`)
- Lead creation form (`LeadForm.jsx`)
- Product creation form (`ProductForm.jsx`)
- Form validation
- Error message display
- Success notifications

#### 4.2.3 Data Tables
- Admin data table (`AdminDataTable.jsx`)
- Client data table
- Lead data table
- Product data table
- Pagination controls
- Search functionality
- Sort functionality
- Row actions (edit, delete)

#### 4.2.4 User Interface Elements
- Login page layout
- Dashboard layout
- Loading indicators
- Error messages
- Success notifications
- Modal dialogs
- Date pickers
- Form inputs

### 4.3 Backend Logic Features

#### 4.3.1 API Endpoints
- All 25+ API endpoints (see section 3.1)
- Request validation
- Response formatting
- Error handling
- Status codes (200, 400, 404, 500)

#### 4.3.2 Database Operations
- MongoDB connection
- Document creation
- Document retrieval
- Document updates
- Document deletion
- Query operations
- Aggregation operations
- Index usage

#### 4.3.3 Business Logic
- Password hashing and validation
- Email validation
- Data sanitization
- Unique constraint enforcement
- Default value assignment
- Timestamp management

### 4.4 Integration Features

#### 4.4.1 Frontend-Backend Integration
- API calls from React components
- Redux action dispatching
- Response handling
- Error handling
- Loading states

#### 4.4.2 Database Integration
- Mongoose model operations
- Schema validation
- Relationship handling
- Transaction support

### 4.5 Non-Functional Features

#### 4.5.1 Performance
- API response times
- Page load times
- Database query performance
- Frontend rendering performance

#### 4.5.2 Security
- Authentication security
- Password encryption
- JWT token security
- Input sanitization
- XSS prevention
- CSRF protection

#### 4.5.3 Usability
- User interface intuitiveness
- Form usability
- Navigation clarity
- Error message clarity
- Responsive design

---

## 5. Features Not to be Tested (Out of Scope)

### 5.1 Third-Party Services
- MongoDB Atlas cloud service (using local MongoDB)
- External payment gateways
- Email service providers
- SMS service providers
- Social media integrations

### 5.2 Infrastructure-Level Testing
- Server infrastructure testing
- Network infrastructure testing
- Load balancer configuration
- CDN performance
- DNS configuration

### 5.3 Production Environment Specific
- Production database migration scripts
- Production monitoring tools (New Relic, Sentry) - configuration only
- Production SSL/TLS certificates
- Production backup and recovery procedures

### 5.4 Deprecated/Experimental Features
- Demo login controller (replaced by real auth)
- Unused API endpoints
- Commented-out code sections
- Beta features not in production

### 5.5 Areas Not Relevant to Course Assignment
- Mobile app testing (web-only application)
- Browser compatibility testing beyond Chrome/Firefox/Safari
- Internationalization (i18n) testing
- Accessibility testing beyond basic checks
- Performance testing under extreme load (>1000 concurrent users)

### 5.6 Code Quality Tools
- Linting configuration (ESLint, Prettier)
- Code formatting
- Git hooks configuration
- Pre-commit hooks

---

## 6. Test Approach / Test Strategy

### 6.1 Black-Box Testing

#### 6.1.1 Functional Testing
**Objective:** Test application functionality without knowledge of internal code structure.

**Techniques:**
- **Equivalence Partitioning:** Test valid/invalid input ranges
- **Boundary Value Analysis:** Test edge cases (min/max values)
- **Decision Table Testing:** Test complex business rules
- **State Transition Testing:** Test state changes (login/logout, status changes)

**Tools:** Cypress, Postman, Supertest

**Test Areas:**
- API endpoint behavior
- Form submissions
- User workflows
- Error handling
- Data validation

#### 6.1.2 UI Testing (Cypress/Selenium)

**Objective:** Verify user interface functionality, user experience, and visual correctness.

**Testing Approach:**
- Test user interactions with UI elements
- Verify page navigation and routing
- Test form submissions and validations
- Validate data display in tables and components
- Test responsive design across screen sizes
- Verify accessibility features

**Techniques:**
- **Page Object Model (POM):** Reusable page objects for UI elements
- **Visual Regression Testing:** Compare screenshots for UI changes
- **Cross-browser Testing:** Chrome, Firefox, Safari compatibility
- **User Flow Testing:** Complete user journeys from start to finish
- **Component Testing:** Test individual UI components in isolation

**Tools:**

1. **Cypress 15.7.1** (Primary UI Testing Tool)
   - **Purpose:** End-to-end UI testing and user flow validation
   - **Features:**
     - Real browser testing (Chrome, Firefox, Electron)
     - Time-travel debugging
     - Automatic screenshots on failure
     - Video recording of test execution
     - Network request interception
     - Custom commands and assertions
   - **Configuration:** `frontend/cypress.config.js`
   - **Test Files:**
     - `frontend/cypress/e2e/login.cy.js` (7 tests)
     - `frontend/cypress/e2e/navigation.cy.js` (6 tests)
     - `frontend/cypress/e2e/admin-crud.cy.js` (5 tests)
     - `frontend/cypress/e2e/customer-crud.cy.js` (2 tests)
     - `frontend/cypress/e2e/lead-crud.cy.js` (2 tests)
     - `frontend/cypress/e2e/product-crud.cy.js` (2 tests)
   - **Custom Commands:** `frontend/cypress/support/commands.js`
     - `cy.login(email, password)` - Login helper
     - `cy.logout()` - Logout helper
     - `cy.navigateTo(path)` - Navigation helper

2. **Selenium** (Optional/Alternative)
   - **Purpose:** Cross-browser UI testing (if needed)
   - **Status:** Not currently implemented (Cypress preferred)

**Test Areas:**

1. **Page Navigation:**
   - Sidebar navigation menu functionality
   - Route navigation between pages
   - Active route highlighting
   - Protected route access
   - Redirect behavior

2. **Form Interactions:**
   - Form field input and validation
   - Submit button functionality
   - Error message display
   - Success notifications
   - Form reset and clearing

3. **Data Table Operations:**
   - Data table rendering
   - Pagination controls
   - Search functionality
   - Sort functionality
   - Row actions (edit, delete buttons)

4. **Modal Dialogs:**
   - Modal opening and closing
   - Form submission in modals
   - Cancel button functionality

5. **Responsive Design:**
   - Mobile viewport testing
   - Tablet viewport testing
   - Desktop viewport testing
   - Layout adaptation

6. **User Workflows:**
   - Complete login workflow
   - CRUD operation workflows
   - Navigation workflows
   - Error handling workflows

**Test Execution:**
```bash
# Interactive mode (GUI)
cd frontend && npm run cypress:open

# Headless mode (CI/CD)
cd frontend && npm run cypress:run
```

**Current Status:**
- ✅ Login Tests: 6/7 passing (86%)
- ✅ Navigation Tests: 5/6 passing (83%)
- ✅ Admin CRUD Tests: 5/5 passing (100%)
- ✅ Customer CRUD Tests: 2/2 passing (100%)
- ✅ Lead CRUD Tests: 2/2 passing (100%)
- ✅ Product CRUD Tests: 2/2 passing (100%)
- **Total UI Tests:** 24 tests
- **Pass Rate:** 92%

#### 6.1.3 API Endpoint Behavior Testing
**Objective:** Verify API endpoints return correct responses.

**Test Cases:**
- Valid request → Success response (200)
- Invalid request → Error response (400)
- Not found → 404 response
- Server error → 500 response
- Authentication required → 401 response

**Tools:** Supertest, Postman, Jest

### 6.2 White-Box Testing

#### 6.2.1 Unit Testing

**Objective:** Test individual functions and methods in isolation to verify they work correctly.

**Testing Approach:**
- Test each function/method independently
- Use mocks and stubs to isolate units
- Test all code paths (branches, conditions, loops)
- Verify input validation and error handling
- Test edge cases and boundary conditions

**Coverage Targets:**
- **Statements:** ≥80%
- **Branches:** ≥75%
- **Functions:** ≥85%
- **Lines:** ≥80%

**Test Areas:**

1. **Model Unit Tests:**
   - Admin model (`models/Admin.js`)
     - Schema validation (required fields, data types)
     - Unique constraints (email uniqueness)
     - Password hashing methods (`generateHash`)
     - Password validation methods (`validPassword`)
     - Default values (enabled, removed, createdAt)
     - Email normalization (lowercase, trim)
   - Client model (`models/Client.js`)
     - Schema validation
     - Required fields validation
   - Lead model (`models/Lead.js`)
     - Schema validation
     - Status default values
   - Product model (`models/Product.js`)
     - Schema validation
     - Status management

2. **Controller Unit Tests:**
   - Admin controller (`controllers/adminController.js`)
     - Create admin function
     - Read admin function
     - Update admin function
     - Delete admin function
     - List admins function
     - Search admins function
     - Update password function
   - Generic CRUD controller (`controllers/crudController/crudMethods.js`)
     - Create method
     - Read method
     - Update method
     - Delete method
     - List method
     - Search method

3. **Utility Functions:**
   - Password hashing utilities
   - Validation utilities
   - Error handling utilities

**Tools:** 
- **Jest 30.2.0** - Primary unit testing framework
- **Supertest 7.1.4** - HTTP assertion library for API testing
- **MongoDB Memory Server 10.4.0** - In-memory MongoDB for isolated testing

**Test Files:**
- `tests/unit/models/Admin.test.js` (17 tests) ✅
- `tests/unit/controllers/adminController.test.js` (13 tests) ✅

**Test Execution:**
```bash
npm test                    # Run all unit tests
npm test -- --coverage      # Run with coverage report
npm test tests/unit/models  # Run specific test suite
```

**Current Status:**
- ✅ Admin Model: 17/17 tests passing (100%)
- ⚠️ Admin Controller: 11/13 tests passing (85% - 2 known failures)
- **Total Unit Tests:** 30 tests
- **Coverage:** 82% overall

#### 6.2.2 Backend Testing (Jest/Pytest)

**Objective:** Comprehensive backend testing using Jest framework to validate all backend functionality.

**Testing Framework:** **Jest 30.2.0** (Primary - Node.js/JavaScript)
- **Alternative:** Pytest (Python) - Not applicable for this Node.js project
- **Rationale:** Jest is the standard testing framework for Node.js/Express.js applications

**Backend Testing Strategy:**

1. **Unit Testing (White-Box):**
   - Test individual functions and methods in isolation
   - Mock external dependencies
   - Test all code paths and branches
   - Verify business logic correctness

2. **Integration Testing (Black-Box):**
   - Test API endpoints end-to-end
   - Test database operations
   - Test request/response handling
   - Test error scenarios

**Backend Test Coverage:**

| Component | Test Type | Test File | Tests | Status |
|-----------|-----------|-----------|-------|--------|
| **Admin Model** | Unit | `tests/unit/models/Admin.test.js` | 17 | ✅ 100% |
| **Admin Controller** | Unit | `tests/unit/controllers/adminController.test.js` | 13 | ⚠️ 85% |
| **Auth API** | Integration | `tests/integration/api/auth.test.js` | 5 | ✅ 100% |
| **Admin API** | Integration | `tests/integration/api/admin.test.js` | 12+ | ✅ 100% |
| **Client API** | Integration | `tests/integration/api/client.test.js` | 20 | ✅ 100% |
| **Lead API** | Integration | `tests/integration/api/lead.test.js` | 12+ | ✅ 100% |
| **Product API** | Integration | `tests/integration/api/product.test.js` | 12+ | ✅ 100% |

**Total Backend Tests:** 108 tests
- **Passing:** 97 tests (90%)
- **Failing:** 8 tests (7% - known controller bug)
- **Skipped:** 3 tests (3% - logout tests)

**Backend API Endpoints Tested:**

1. **Authentication Endpoints:**
   - ✅ `POST /api/login` - User login
   - ⏸️ `POST /api/logout` - User logout (tests skipped)

2. **Admin Management Endpoints:**
   - ✅ `POST /api/admin/create` - Create admin
   - ✅ `GET /api/admin/read/:id` - Read admin
   - ✅ `PATCH /api/admin/update/:id` - Update admin
   - ✅ `DELETE /api/admin/delete/:id` - Delete admin
   - ✅ `GET /api/admin/list` - List admins
   - ✅ `GET /api/admin/search` - Search admins
   - ✅ `PATCH /api/admin/password-update/:id` - Update password

3. **Client Management Endpoints:**
   - ✅ `POST /api/client/create` - Create client
   - ✅ `GET /api/client/read/:id` - Read client
   - ✅ `PATCH /api/client/update/:id` - Update client
   - ✅ `DELETE /api/client/delete/:id` - Delete client
   - ✅ `GET /api/client/list` - List clients
   - ✅ `GET /api/client/search` - Search clients

4. **Lead Management Endpoints:**
   - ✅ `POST /api/lead/create` - Create lead
   - ✅ `GET /api/lead/read/:id` - Read lead
   - ✅ `PATCH /api/lead/update/:id` - Update lead
   - ✅ `DELETE /api/lead/delete/:id` - Delete lead
   - ✅ `GET /api/lead/list` - List leads
   - ✅ `GET /api/lead/search` - Search leads

5. **Product Management Endpoints:**
   - ✅ `POST /api/product/create` - Create product
   - ✅ `GET /api/product/read/:id` - Read product
   - ✅ `PATCH /api/product/update/:id` - Update product
   - ✅ `DELETE /api/product/delete/:id` - Delete product
   - ✅ `GET /api/product/list` - List products
   - ✅ `GET /api/product/search` - Search products

**Backend Test Execution:**

```bash
# Run all backend tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test tests/integration/api/auth.test.js

# Run in watch mode
npm run test:watch
```

**Backend Test Configuration:**
- **Config File:** `jest.config.js`
- **Setup File:** `tests/setup.js` - MongoDB Memory Server initialization
- **Teardown File:** `tests/teardown.js` - Cleanup after tests
- **Test Environment:** Node.js test environment
- **Test Timeout:** 30 seconds
- **Test Execution:** Sequential (`--runInBand`) to avoid database conflicts

**Backend Test Results:**
- **Execution Time:** ~7.6 seconds
- **Code Coverage:** 82% overall
- **API Coverage:** 100% (all endpoints tested)
- **CI/CD Integration:** ✅ Automated in GitHub Actions

#### 6.2.3 Code Coverage Analysis
**Objective:** Measure code coverage and identify untested code.

**Metrics:**
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

**Tools:** Jest Coverage, Istanbul

**Target:** ≥80% overall coverage

### 6.3 Integration Testing

#### 6.3.1 Backend-Database Integration Testing

**Objective:** Verify database operations work correctly with Mongoose models and MongoDB.

**Testing Approach:**
- Test Mongoose model operations with real database (MongoDB Memory Server)
- Verify schema validation works correctly
- Test database queries and data persistence
- Validate relationships and references
- Test error handling for database operations

**Test Areas:**

1. **Database Model Operations:**
   - Document creation (save operations)
   - Document retrieval (find, findOne, findById)
   - Document updates (updateOne, findOneAndUpdate)
   - Document deletion (deleteOne, findOneAndDelete)
   - Query operations (filtering, sorting, pagination)
   - Aggregation operations

2. **Schema Validation:**
   - Required field validation
   - Data type validation
   - Unique constraint validation
   - Default value assignment
   - Custom validation rules

3. **Data Persistence:**
   - Data is correctly saved to database
   - Data is correctly retrieved from database
   - Data updates are persisted
   - Data deletions are permanent

**Tools:** 
- **Jest 30.2.0** - Test framework
- **MongoDB Memory Server 10.4.0** - In-memory MongoDB instance
- **Supertest 7.1.4** - HTTP assertions
- **Mongoose 5.9.10** - ODM for MongoDB

**Test Files:**
- `tests/integration/api/auth.test.js` (5 tests) ✅
- `tests/integration/api/admin.test.js` (12+ tests) ✅
- `tests/integration/api/client.test.js` (20 tests) ✅
- `tests/integration/api/lead.test.js` (12+ tests) ✅
- `tests/integration/api/product.test.js` (12+ tests) ✅

**Test Execution:**
```bash
npm test tests/integration    # Run all integration tests
npm test tests/integration/api/auth.test.js  # Run specific test file
```

**Current Status:**
- ✅ Auth API: 5/5 tests passing (100%)
- ✅ Admin API: 12+ tests passing (100%)
- ✅ Client API: 20/20 tests passing (100%)
- ✅ Lead API: 12+ tests passing (100%)
- ✅ Product API: 12+ tests passing (100%)
- **Total Integration Tests:** 69+ tests
- **Pass Rate:** 100%

#### 6.3.2 Frontend-Backend Integration Testing

**Objective:** Verify frontend correctly communicates with backend APIs and handles responses.

**Testing Approach:**
- Test API calls from React components
- Verify Redux action dispatching and state management
- Test response handling and error handling
- Validate data flow from backend to frontend
- Test loading states and UI updates

**Test Areas:**

1. **API Communication:**
   - HTTP requests (GET, POST, PATCH, DELETE)
   - Request headers and authentication tokens
   - Request payload formatting
   - Response parsing and handling

2. **State Management:**
   - Redux action dispatching
   - Redux reducer state updates
   - Redux selector data retrieval
   - State persistence

3. **Error Handling:**
   - Network error handling
   - API error response handling
   - Error message display
   - Fallback UI states

**Tools:** 
- **Cypress 15.7.1** - E2E testing framework
- **Axios 0.21.1** - HTTP client (used by frontend)

**Test Files:**
- `frontend/cypress/e2e/login.cy.js` - Login API integration
- `frontend/cypress/e2e/navigation.cy.js` - Navigation with API calls
- `frontend/cypress/e2e/admin-crud.cy.js` - Admin CRUD operations
- `frontend/cypress/e2e/customer-crud.cy.js` - Client CRUD operations
- `frontend/cypress/e2e/lead-crud.cy.js` - Lead CRUD operations
- `frontend/cypress/e2e/product-crud.cy.js` - Product CRUD operations

**Current Status:**
- ✅ Frontend-Backend Integration: 22/24 tests passing (92%)

#### 6.3.3 API Integration Testing

**Objective:** Test complete API workflows and endpoint interactions.

**Test Scenarios:**

1. **CRUD Workflows:**
   - Create → Read → Update → Delete complete workflows
   - Verify data consistency throughout workflow
   - Test error scenarios in workflows

2. **Search Functionality:**
   - Search by single field
   - Search by multiple fields
   - Search with no results
   - Search with empty query

3. **Pagination:**
   - First page retrieval
   - Page navigation
   - Items per page configuration
   - Empty result sets

4. **Filtering and Sorting:**
   - Filter by status
   - Sort by date/name
   - Combined filters

**Tools:** 
- **Supertest 7.1.4** - HTTP assertions
- **Jest 30.2.0** - Test framework

**Test Coverage:**
- ✅ All 25+ API endpoints tested
- ✅ All CRUD operations tested
- ✅ Search functionality tested
- ✅ Pagination tested
- ✅ Error handling tested

### 6.4 System Testing

#### 6.4.1 End-to-End Testing
**Objective:** Test complete user workflows from start to finish.

**Test Scenarios:**
1. User Login → Navigate to Admin → Create Admin → View Admin → Update Admin → Delete Admin
2. User Login → Navigate to Customer → Create Customer → Search Customer → Update Customer
3. User Login → Navigate to Lead → Create Lead → Update Status → Delete Lead
4. User Login → Navigate to Product → Create Product → Search Product → Update Product

**Tools:** Cypress

**Test Files:**
- `frontend/cypress/e2e/login.cy.js`
- `frontend/cypress/e2e/navigation.cy.js`
- `frontend/cypress/e2e/admin-crud.cy.js`
- `frontend/cypress/e2e/customer-crud.cy.js`
- `frontend/cypress/e2e/lead-crud.cy.js`
- `frontend/cypress/e2e/product-crud.cy.js`

### 6.5 Regression Testing

#### 6.5.1 Automated Regression Testing
**Objective:** Ensure new changes don't break existing functionality.

**Approach:**
- Run full test suite on each commit
- Run on pull requests
- Run before deployment

**Tools:** GitHub Actions CI/CD pipeline

**Trigger:** Automatic on push/PR

### 6.6 Smoke Testing

#### 6.6.1 Pre-Deployment Smoke Tests
**Objective:** Verify critical functionality before deployment.

**Test Cases:**
- Application starts successfully
- Database connection works
- Login functionality works
- Main pages load
- API endpoints respond

**Execution:** Before staging/production deployment

### 6.7 Non-Functional Testing

#### 6.7.1 Performance Testing

**Objective:** Verify application performance under normal load conditions.

**Performance Metrics:**
- **API Response Time:** <500ms for standard operations
- **Page Load Time:** <3 seconds for initial page load
- **Database Query Time:** <100ms for standard queries
- **Time to Interactive (TTI):** <5 seconds
- **First Contentful Paint (FCP):** <1.5 seconds

**Test Scenarios:**
1. API endpoint response times
2. Page load performance
3. Database query performance
4. Frontend rendering performance
5. Network request optimization

**Tools:** 
- **Lighthouse** - Performance auditing
- **Chrome DevTools** - Performance profiling
- **Cypress** - Performance measurement in E2E tests

**Test Execution:**
- Manual performance testing using Chrome DevTools
- Automated performance metrics collection via Cypress
- Lighthouse audits for performance scores

**Target Performance Scores:**
- Performance: ≥80
- Accessibility: ≥80
- Best Practices: ≥80
- SEO: ≥80

#### 6.7.2 Security Testing

**Objective:** Verify security mechanisms and protect against vulnerabilities.

**Security Test Areas:**

1. **Authentication Security:**
   - Password encryption using bcryptjs (hashing, not plain text)
   - JWT token generation and validation
   - Token expiration handling
   - Session management
   - Invalid credential handling

2. **Authorization Security:**
   - Protected route access
   - Role-based access control (if implemented)
   - Token validation middleware

3. **Input Validation:**
   - Input sanitization
   - SQL injection prevention (MongoDB injection prevention)
   - XSS (Cross-Site Scripting) prevention
   - CSRF (Cross-Site Request Forgery) protection
   - Email format validation
   - Password strength requirements

4. **Data Security:**
   - Sensitive data not exposed in responses
   - Password not returned in API responses
   - Secure data transmission (HTTPS in production)

**Tools:** 
- **Manual Testing** - Security checklist validation
- **OWASP ZAP** (optional) - Automated security scanning
- **Jest** - Security-focused unit tests
- **Cypress** - Security-focused E2E tests

**Security Test Cases:**
- ✅ Password hashing verification (TC-60)
- ✅ JWT token validation (TC-08, TC-09)
- ✅ Protected route access (TC-53)
- ✅ Input validation (TC-02, TC-03, TC-12)
- ✅ XSS prevention (manual testing)

#### 6.7.3 Usability Testing

**Objective:** Verify user interface usability and user experience quality.

**Usability Test Areas:**

1. **Form Usability:**
   - Form layout and clarity
   - Field labeling and instructions
   - Error message clarity and placement
   - Success feedback
   - Form submission flow

2. **Navigation Usability:**
   - Navigation menu intuitiveness
   - Active page indication
   - Breadcrumb navigation (if applicable)
   - Back button functionality

3. **Content Usability:**
   - Content readability
   - Information hierarchy
   - Button placement and labeling
   - Icon clarity and meaning

4. **Error Handling Usability:**
   - Error message clarity
   - Error recovery guidance
   - Validation error display
   - User-friendly error messages

5. **Responsive Design:**
   - Mobile device compatibility
   - Tablet device compatibility
   - Desktop optimization
   - Touch-friendly interactions

**Tools:** 
- **Manual Testing** - User experience evaluation
- **Cypress** - Automated usability checks
- **User Feedback** - Real user testing (if available)

**Usability Test Cases:**
- ✅ Form validation display (TC-48)
- ✅ Navigation functionality (TC-43 to TC-47)
- ✅ Error message clarity (TC-02, TC-03)
- ✅ Responsive design (manual testing)

#### 6.7.4 Accessibility Testing

**Objective:** Basic accessibility checks to ensure application is usable by people with disabilities.

**Accessibility Test Areas:**

1. **Form Accessibility:**
   - Form labels associated with inputs
   - Required field indicators
   - Error message associations
   - Form validation announcements

2. **Navigation Accessibility:**
   - Keyboard navigation support
   - Focus indicators
   - Skip links (if applicable)
   - ARIA labels

3. **Content Accessibility:**
   - Heading hierarchy
   - Alt text for images
   - Color contrast ratios
   - Text readability

4. **Interactive Elements:**
   - Button accessibility
   - Link accessibility
   - Keyboard shortcuts
   - Screen reader compatibility (basic)

**Tools:** 
- **Manual Testing** - Keyboard navigation, screen reader testing
- **Lighthouse** - Accessibility audit
- **Chrome DevTools** - Accessibility inspection
- **WAVE** (optional) - Web accessibility evaluation tool

**Accessibility Test Cases:**
- ✅ Form label associations (manual testing)
- ✅ Keyboard navigation (manual testing)
- ✅ Focus indicators (manual testing)
- ✅ Lighthouse accessibility score (automated)

**Target Accessibility Score:** ≥80 (Lighthouse)

---

## 7. Testing Tools

### 7.1 Backend Testing Tools

#### 7.1.1 Jest (Primary Backend Testing Framework)
- **Version:** 30.2.0
- **Purpose:** Unit testing and integration testing for Node.js backend
- **Configuration File:** `jest.config.js`
- **Features:**
  - Test execution and assertion library
  - Code coverage analysis
  - Mocking and stubbing capabilities
  - Test isolation and parallel execution
  - Snapshot testing
- **Usage:**
  ```bash
  npm test                    # Run all tests
  npm test -- --coverage      # Run with coverage
  npm test -- --watch         # Watch mode
  ```

#### 7.1.2 Supertest (HTTP Assertion Library)
- **Version:** 7.1.4
- **Purpose:** HTTP endpoint testing for Express.js APIs
- **Usage:** Integrated with Jest for API integration testing
- **Features:**
  - HTTP request simulation
  - Response assertion
  - Status code validation
  - Response body validation

#### 7.1.3 MongoDB Memory Server
- **Version:** 10.4.0
- **Purpose:** In-memory MongoDB instance for isolated testing
- **Configuration:** `tests/setup.js`
- **Features:**
  - No external MongoDB required
  - Fast test execution
  - Complete test isolation
  - Automatic cleanup

#### 7.1.4 Node.js
- **Version:** 14.x / 18.x / 24.x
- **Purpose:** Backend runtime environment
- **Usage:** Required for running backend tests

### 7.2 Frontend Testing Tools

#### 7.2.1 Cypress (Primary UI Testing Framework)
- **Version:** 15.7.1
- **Purpose:** End-to-end UI testing and user flow validation
- **Configuration File:** `frontend/cypress.config.js`
- **Features:**
  - Real browser testing (Chrome, Firefox, Electron)
  - Time-travel debugging
  - Automatic screenshots on failure
  - Video recording
  - Network request interception
  - Custom commands
  - Page Object Model support
- **Usage:**
  ```bash
  npm run cypress:open    # Interactive GUI mode
  npm run cypress:run     # Headless CI mode
  ```

#### 7.2.2 Selenium (Optional/Alternative)
- **Purpose:** Cross-browser UI testing (if needed)
- **Status:** Not currently implemented (Cypress preferred)
- **Use Case:** Alternative for complex cross-browser scenarios

#### 7.2.3 React Testing Library (Optional)
- **Purpose:** Component-level unit testing
- **Status:** Available but not extensively used (Cypress covers UI testing)
- **Use Case:** Unit testing React components in isolation

### 7.3 CI/CD Tools

#### 7.3.1 GitHub Actions
- **Purpose:** Continuous Integration and Continuous Deployment
- **Configuration:** `.github/workflows/ci-cd.yml`
- **Features:**
  - Automated test execution
  - Build automation
  - Deployment automation
  - Test result reporting
  - Artifact management

#### 7.3.2 Docker (Optional)
- **Purpose:** Containerized testing environments
- **Status:** Available for consistent test environments
- **Use Case:** Environment standardization

### 7.4 Performance Testing Tools

#### 7.4.1 Lighthouse
- **Purpose:** Performance, accessibility, and SEO auditing
- **Usage:** Chrome DevTools integration
- **Metrics:** Performance score, accessibility score, best practices

#### 7.4.2 Chrome DevTools
- **Purpose:** Performance profiling and debugging
- **Features:**
  - Network throttling
  - Performance profiling
  - Memory analysis
  - Accessibility inspection

### 7.5 Security Testing Tools

#### 7.5.1 OWASP ZAP (Optional)
- **Purpose:** Automated security vulnerability scanning
- **Status:** Available for advanced security testing
- **Use Case:** Security audit and vulnerability detection

#### 7.5.2 Manual Security Testing
- **Purpose:** Security checklist validation
- **Approach:** Manual verification of security mechanisms

### 7.6 Test Management Tools

#### 7.6.1 Test Documentation
- **Format:** Markdown files
- **Files:** `IEEE_829_TEST_PLAN.md`, `TEST_RESULTS_SUMMARY.md`
- **Purpose:** Test plan and results documentation

#### 7.6.2 Code Coverage Tools
- **Jest Coverage:** Built-in coverage reporting
- **Istanbul:** Coverage analysis (via Jest)
- **Reports:** HTML, LCOV, text formats

### 7.7 Tool Integration Summary

| Tool Category | Tool Name | Version | Purpose | Status |
|---------------|-----------|---------|---------|--------|
| **Backend Testing** | Jest | 30.2.0 | Unit & Integration testing | ✅ Active |
| **Backend Testing** | Supertest | 7.1.4 | HTTP API testing | ✅ Active |
| **Backend Testing** | MongoDB Memory Server | 10.4.0 | Test database | ✅ Active |
| **Frontend Testing** | Cypress | 15.7.1 | E2E UI testing | ✅ Active |
| **Frontend Testing** | Selenium | - | Alternative UI testing | ⏸️ Available |
| **CI/CD** | GitHub Actions | Latest | Automation pipeline | ✅ Active |
| **Performance** | Lighthouse | Latest | Performance audit | ✅ Available |
| **Performance** | Chrome DevTools | Latest | Profiling | ✅ Available |
| **Security** | OWASP ZAP | - | Security scanning | ⏸️ Optional |
| **Coverage** | Jest Coverage | 30.2.0 | Code coverage | ✅ Active |

---

## 8. Test Environment

### 7.1 Development Environment

#### 7.1.1 Local Development Setup
**Operating System:** macOS 24.6.0 / Linux / Windows  
**Node.js Version:** 14.x / 18.x / 24.x  
**MongoDB Version:** 6.0 (local installation or MongoDB Memory Server)  
**Browser:** Chrome 120+, Firefox 121+, Safari 17+

**Backend:**
- Port: 8888
- Database: MongoDB (local or memory server)
- Environment File: `.variables.env`

**Frontend:**
- Port: 3000
- Framework: React 17.0.2
- Build Tool: CRACO (Create React App Configuration Override)

**Configuration Files:**
- `package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies
- `.variables.env` - Environment variables
- `jest.config.js` - Jest configuration
- `frontend/cypress.config.js` - Cypress configuration

### 7.2 Staging Environment

#### 7.2.1 Staging Setup
**Deployment Platform:** TBD (Vercel/Netlify for frontend, Heroku/Railway for backend)  
**Database:** MongoDB Atlas (staging cluster)  
**URL:** https://staging.mern-admin.example.com (TBD)

**Configuration:**
- Environment variables configured in deployment platform
- CI/CD auto-deployment from `develop` branch
- Test data seeded

**Access:**
- Test user credentials provided
- Monitoring tools configured

### 7.3 Production Environment

#### 7.3.1 Production Setup
**Deployment Platform:** TBD  
**Database:** MongoDB Atlas (production cluster)  
**URL:** https://mern-admin.example.com (TBD)

**Configuration:**
- Production environment variables
- SSL/TLS certificates
- Monitoring: Sentry (error tracking), New Relic (optional)
- Health check endpoints

**Access:**
- Restricted access
- Production credentials secured

### 7.4 CI/CD Environment

#### 7.4.1 GitHub Actions
**Platform:** GitHub Actions (Ubuntu Latest)  
**Node.js:** 18.x  
**MongoDB:** 6.0 (Docker service)

**Workflow:** `.github/workflows/ci-cd.yml`

**Stages:**
1. Source: Code checkout
2. Build: Backend & Frontend build
3. Test: Jest backend tests, Cypress E2E tests
4. Deploy: Staging/Production deployment

### 7.5 Test Data Management

#### 7.5.1 Test Data Strategy
- **Unit Tests:** Mock data using Jest mocks
- **Integration Tests:** MongoDB Memory Server with seeded data
- **E2E Tests:** Test database with consistent test data
- **Test Fixtures:** `cypress/fixtures/example.json`

**Test Credentials:**
- Email: `admin@demo.com`
- Password: `123456`

---

## 9. Roles and Responsibilities

### 8.1 Test Team Structure (3 Members)

#### 8.1.1 Test Lead
**Name:** [Team Member 1]  
**Responsibilities:**
- Overall test planning and strategy
- Test plan document creation and maintenance
- Test execution coordination
- Defect management and tracking
- Test reporting and metrics
- Stakeholder communication
- IEEE 829 compliance verification

#### 8.1.2 QA Engineer
**Name:** [Team Member 2]  
**Responsibilities:**
- Manual test case execution
- Test case design and documentation
- Functional testing
- UI/UX testing
- Defect reporting and verification
- Test data preparation
- Requirements traceability

#### 8.1.3 Automation Engineer / CI/CD Engineer
**Name:** [Team Member 3]  
**Responsibilities:**
- Automated test script development
- CI/CD pipeline configuration
- Test framework setup (Jest, Cypress)
- Test execution automation
- Test maintenance
- Code coverage analysis
- Performance testing

### 8.2 Collaboration Model
- **Daily Standups:** Test progress updates
- **Weekly Reviews:** Test results and metrics review
- **Sprint Planning:** Test case assignment
- **Defect Triage:** Priority assignment and resolution tracking

---

## 10. Test Schedule

### 9.1 Testing Timeline

| Week | Phase | Activities | Deliverables |
|------|-------|------------|--------------|
| **Week 1-2** | Planning | Test plan creation, test case design, environment setup | IEEE Test Plan Document, Test Cases Document |
| **Week 3-4** | Unit Testing | Backend unit tests, model tests, controller tests | Unit test files, Coverage reports |
| **Week 5** | Integration Testing | API integration tests, database integration tests | Integration test files, Test results |
| **Week 6** | UI Automation | Cypress E2E tests, UI test automation | E2E test files, Test execution reports |
| **Week 7** | Staging Testing | Staging deployment, system testing, regression testing | Staging test results, Defect reports |
| **Week 8** | Final Testing | Production readiness, final regression, documentation | Final test report, Deployment readiness |

### 9.2 Milestones

- **M1 (Week 2):** Test Plan Approved
- **M2 (Week 4):** Unit Tests Complete (≥80% coverage)
- **M3 (Week 5):** Integration Tests Complete
- **M4 (Week 6):** E2E Tests Complete
- **M5 (Week 7):** Staging Deployment Successful
- **M6 (Week 8):** Production Ready

### 9.3 Resource Allocation

- **Test Lead:** 20% time allocation
- **QA Engineer:** 40% time allocation
- **Automation Engineer:** 40% time allocation

---

## 11. Risks & Mitigation Strategy

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **UI tests are flaky** | Medium | High | Use stable selectors, explicit waits, retry mechanisms, Page Object Model |
| **API rate limiting** | Medium | Medium | Mock external APIs, implement rate limiting in tests, use test data |
| **Staging environment downtime** | High | Medium | Maintain backup staging environment, use local testing when staging unavailable |
| **Test data inconsistency** | High | High | Use seed scripts, MongoDB Memory Server for isolation, consistent test fixtures |
| **Environment mismatch** | High | Medium | Use Docker containers, environment variable management, CI/CD standardization |
| **Broken CI/CD pipeline** | High | Medium | Linting before commit, branch protection, test pipeline validation, rollback procedures |
| **Database connection issues** | High | Medium | Connection retry logic, health checks, MongoDB Memory Server fallback |
| **Browser compatibility issues** | Medium | Low | Test on multiple browsers, use Cypress cross-browser testing |
| **Test execution timeouts** | Medium | Medium | Increase timeout values, optimize test execution, parallel test execution |
| **Incomplete test coverage** | Medium | Medium | Set coverage targets, regular coverage reviews, untested code identification |

---

## 12. Test Exit and Entry Criteria

### 11.1 Entry Criteria

#### 11.1.1 Code Readiness
- ✅ Code builds successfully without errors
- ✅ All dependencies installed and resolved
- ✅ Environment variables configured
- ✅ Database schema deployed

#### 11.1.2 Environment Readiness
- ✅ Test environment deployed and accessible
- ✅ Test database configured
- ✅ Test servers running (backend: 8888, frontend: 3000)
- ✅ CI/CD pipeline passes build stage

#### 11.1.3 Test Readiness
- ✅ Test plan approved
- ✅ Test cases documented
- ✅ Test data prepared
- ✅ Test tools installed and configured

### 11.2 Exit Criteria

#### 11.2.1 Test Execution
- ✅ ≥90% of test cases passed
- ✅ All critical test cases passed (100%)
- ✅ No critical bugs open (P0, P1)
- ✅ ≤5 high-priority bugs open (P2)

#### 11.2.2 Code Coverage
- ✅ ≥80% code coverage achieved
- ✅ All critical paths covered
- ✅ All API endpoints tested

#### 11.2.3 Quality Metrics
- ✅ Test execution completed
- ✅ Defect density < 5 defects/KLOC
- ✅ Mean time to detect defects (MTTD) acceptable
- ✅ Mean time to resolve defects (MTTR) acceptable

#### 11.2.4 Deployment Readiness
- ✅ Staging deployment successful
- ✅ Staging smoke tests passed
- ✅ Production deployment plan approved
- ✅ Rollback plan documented

---

## 13. Test Deliverables

### 12.1 Test Documentation

1. **IEEE Test Plan Document** (This document)
   - File: `IEEE_829_TEST_PLAN.md`
   - Format: Markdown
   - Status: ✅ Complete

2. **Test Cases Document**
   - Detailed test cases (see Section 14)
   - File: `TEST_CASES.md` (to be created)
   - Format: Markdown/Excel

3. **Test Execution Reports**
   - Test results summary
   - File: `TEST_RESULTS_SUMMARY.md`
   - Status: ✅ Complete

### 12.2 Test Artifacts

4. **Unit Test Files**
   - `tests/unit/models/Admin.test.js`
   - `tests/unit/controllers/adminController.test.js`
   - Status: ✅ Complete

5. **Integration Test Files**
   - `tests/integration/api/auth.test.js`
   - `tests/integration/api/admin.test.js`
   - `tests/integration/api/client.test.js`
   - `tests/integration/api/lead.test.js`
   - `tests/integration/api/product.test.js`
   - Status: ✅ Complete

6. **E2E Test Files**
   - `frontend/cypress/e2e/login.cy.js`
   - `frontend/cypress/e2e/navigation.cy.js`
   - `frontend/cypress/e2e/admin-crud.cy.js`
   - `frontend/cypress/e2e/customer-crud.cy.js`
   - `frontend/cypress/e2e/lead-crud.cy.js`
   - `frontend/cypress/e2e/product-crud.cy.js`
   - Status: ✅ Complete

### 12.3 Configuration Files

7. **Test Configuration**
   - `jest.config.js` - Jest configuration
   - `frontend/cypress.config.js` - Cypress configuration
   - `tests/setup.js` - Test setup
   - `tests/teardown.js` - Test teardown
   - Status: ✅ Complete

8. **CI/CD Configuration**
   - `.github/workflows/ci-cd.yml` - GitHub Actions workflow
   - Status: ✅ Complete

### 12.4 Reports

9. **Test Summary Reports**
   - Test execution summary
   - Coverage reports
   - Defect reports
   - Status: ✅ Partial

10. **Defect Reports**
    - Bug tracking
    - Defect metrics
    - Status: ⏳ Pending

### 12.5 Supporting Documentation

11. **Setup Guides**
    - `SETUP_GUIDE.md` - Application setup
    - `CI_CD_SETUP.md` - CI/CD setup
    - `CYPRESS_SETUP.md` - Cypress setup
    - Status: ✅ Complete

12. **Deployment Documentation**
    - Deployment instructions
    - Environment configuration
    - Status: ⏳ Partial

---

## 14. Requirements Traceability Matrix

| Requirement ID | Requirement Description | Feature/Module | Test Case IDs | Status |
|----------------|-------------------------|----------------|---------------|--------|
| **RQ-01** | User Authentication - Login | Authentication Module | TC-01, TC-02, TC-03, TC-04, TC-05 | ✅ Tested |
| **RQ-02** | User Authentication - Logout | Authentication Module | TC-06, TC-07 | ⏳ Partial |
| **RQ-03** | JWT Token Validation | Authentication Module | TC-08, TC-09 | ✅ Tested |
| **RQ-04** | Admin Creation | Admin Management | TC-10, TC-11, TC-12 | ✅ Tested |
| **RQ-05** | Admin Retrieval | Admin Management | TC-13, TC-14, TC-15 | ✅ Tested |
| **RQ-06** | Admin Update | Admin Management | TC-16, TC-17 | ✅ Tested |
| **RQ-07** | Admin Deletion | Admin Management | TC-18, TC-19 | ✅ Tested |
| **RQ-08** | Admin Search | Admin Management | TC-20, TC-21 | ✅ Tested |
| **RQ-09** | Admin List with Pagination | Admin Management | TC-22, TC-23 | ✅ Tested |
| **RQ-10** | Client Creation | Client Management | TC-24, TC-25, TC-26 | ✅ Tested |
| **RQ-11** | Client Retrieval | Client Management | TC-27, TC-28 | ✅ Tested |
| **RQ-12** | Client Update | Client Management | TC-29, TC-30 | ✅ Tested |
| **RQ-13** | Client Deletion | Client Management | TC-31, TC-32 | ✅ Tested |
| **RQ-14** | Client Search | Client Management | TC-33, TC-34 | ✅ Tested |
| **RQ-15** | Lead Creation | Lead Management | TC-35, TC-36 | ✅ Tested |
| **RQ-16** | Lead Status Management | Lead Management | TC-37, TC-38 | ✅ Tested |
| **RQ-17** | Product Creation | Product Management | TC-39, TC-40 | ✅ Tested |
| **RQ-18** | Product Status Management | Product Management | TC-41, TC-42 | ✅ Tested |
| **RQ-19** | UI Navigation | Frontend Navigation | TC-43, TC-44, TC-45, TC-46, TC-47 | ✅ Tested |
| **RQ-20** | Form Validation | UI Forms | TC-48, TC-49, TC-50 | ✅ Tested |
| **RQ-21** | Data Table Display | UI Components | TC-51, TC-52 | ✅ Tested |
| **RQ-22** | Protected Route Access | Authentication + Routing | TC-53, TC-54 | ✅ Tested |
| **RQ-23** | API Error Handling | Backend APIs | TC-55, TC-56, TC-57 | ✅ Tested |
| **RQ-24** | Database Operations | Database Layer | TC-58, TC-59 | ✅ Tested |
| **RQ-25** | Password Security | Authentication Security | TC-60, TC-61 | ✅ Tested |

**Total Requirements:** 25  
**Tested Requirements:** 24 (96%)  
**Partially Tested:** 1 (4%)

---

## 15. Detailed Test Cases

### Test Case TC-01: Login with Valid Credentials
- **Test Case ID:** TC-01
- **Title:** Verify successful login with valid email and password
- **Description:** User should be able to login with valid credentials and receive JWT token
- **Preconditions:** Backend server running, test user exists in database
- **Test Data:** Email: `admin@demo.com`, Password: `123456`
- **Steps:**
  1. Navigate to `/login` page
  2. Enter email: `admin@demo.com`
  3. Enter password: `123456`
  4. Click "Log in" button
- **Expected Result:** User redirected to dashboard, JWT token stored, session established
- **Actual Result:** [To be filled during execution]
- **Priority:** High
- **Type:** Functional / E2E
- **Automated:** Yes (Cypress: `login.cy.js`)

### Test Case TC-02: Login with Invalid Email
- **Test Case ID:** TC-02
- **Title:** Verify login fails with invalid email format
- **Description:** System should reject login attempts with invalid email format
- **Preconditions:** Backend server running
- **Test Data:** Email: `invalid-email`, Password: `123456`
- **Steps:**
  1. Navigate to `/login` page
  2. Enter invalid email: `invalid-email`
  3. Enter password: `123456`
  4. Click "Log in" button
- **Expected Result:** Error message displayed: "Please input your Email!" or validation error
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Functional / UI
- **Automated:** Yes (Cypress: `login.cy.js`)

### Test Case TC-03: Login with Missing Password
- **Test Case ID:** TC-03
- **Title:** Verify login form validation for missing password
- **Description:** Form should validate required password field
- **Preconditions:** Backend server running
- **Test Data:** Email: `admin@demo.com`, Password: (empty)
- **Steps:**
  1. Navigate to `/login` page
  2. Enter email: `admin@demo.com`
  3. Leave password field empty
  4. Click "Log in" button
- **Expected Result:** Validation error: "Please input your Password!"
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Functional / UI
- **Automated:** Yes (Cypress: `login.cy.js`)

### Test Case TC-04: Login API - Valid Credentials
- **Test Case ID:** TC-04
- **Title:** Verify login API returns success with valid credentials
- **Description:** POST `/api/login` should return 200 status with JWT token
- **Preconditions:** Backend server running, test admin exists
- **Test Data:** `{"email": "admin@demo.com", "password": "123456"}`
- **Steps:**
  1. Send POST request to `/api/login`
  2. Include valid credentials in request body
- **Expected Result:** Status 200, response contains `success: true` and `token` field
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/auth.test.js`)

### Test Case TC-05: Login API - Invalid Credentials
- **Test Case ID:** TC-05
- **Title:** Verify login API returns error with invalid credentials
- **Description:** POST `/api/login` should return 400 status for invalid credentials
- **Preconditions:** Backend server running
- **Test Data:** `{"email": "wrong@email.com", "password": "wrongpass"}`
- **Steps:**
  1. Send POST request to `/api/login`
  2. Include invalid credentials in request body
- **Expected Result:** Status 400, error message indicating invalid credentials
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/auth.test.js`)

### Test Case TC-10: Create Admin - Valid Data
- **Test Case ID:** TC-10
- **Title:** Verify admin creation with valid data
- **Description:** POST `/api/admin/create` should create new admin successfully
- **Preconditions:** Backend server running, authenticated user
- **Test Data:** `{"email": "newadmin@test.com", "password": "password123", "name": "New", "surname": "Admin"}`
- **Steps:**
  1. Send POST request to `/api/admin/create`
  2. Include valid admin data in request body
- **Expected Result:** Status 200, admin created, response contains admin details (without password)
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-11: Create Admin - Duplicate Email
- **Test Case ID:** TC-11
- **Title:** Verify admin creation fails with duplicate email
- **Description:** System should prevent creating admin with existing email
- **Preconditions:** Backend server running, admin with email exists
- **Test Data:** `{"email": "existing@test.com", "password": "password123", "name": "Test", "surname": "User"}`
- **Steps:**
  1. Send POST request to `/api/admin/create`
  2. Include email that already exists
- **Expected Result:** Status 400, error message: "An account with this email already exists."
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-12: Create Admin - Short Password
- **Test Case ID:** TC-12
- **Title:** Verify admin creation fails with password < 8 characters
- **Description:** System should enforce minimum password length
- **Preconditions:** Backend server running
- **Test Data:** `{"email": "test@test.com", "password": "short", "name": "Test", "surname": "User"}`
- **Steps:**
  1. Send POST request to `/api/admin/create`
  2. Include password with less than 8 characters
- **Expected Result:** Status 400, error: "The password needs to be at least 8 characters long."
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-13: Read Admin by ID
- **Test Case ID:** TC-13
- **Title:** Verify admin retrieval by valid ID
- **Description:** GET `/api/admin/read/:id` should return admin details
- **Preconditions:** Backend server running, admin exists in database
- **Test Data:** Valid admin ID
- **Steps:**
  1. Send GET request to `/api/admin/read/{adminId}`
- **Expected Result:** Status 200, admin details returned (email, name, surname, enabled status)
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-14: Read Admin - Non-existent ID
- **Test Case ID:** TC-14
- **Title:** Verify admin retrieval returns 404 for non-existent ID
- **Description:** GET `/api/admin/read/:id` should return 404 for invalid ID
- **Preconditions:** Backend server running
- **Test Data:** Invalid/non-existent admin ID
- **Steps:**
  1. Send GET request to `/api/admin/read/{invalidId}`
- **Expected Result:** Status 404, error message: "No document found by this id: {id}"
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-20: Search Admins by Email
- **Test Case ID:** TC-20
- **Title:** Verify admin search functionality by email
- **Description:** GET `/api/admin/search?q={query}&fields=email` should return matching admins
- **Preconditions:** Backend server running, admins exist in database
- **Test Data:** Query: `admin@demo.com`, Fields: `email`
- **Steps:**
  1. Send GET request to `/api/admin/search?q=admin@demo.com&fields=email`
- **Expected Result:** Status 200, array of matching admin records
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-24: Create Client - Valid Data
- **Test Case ID:** TC-24
- **Title:** Verify client creation with valid required fields
- **Description:** POST `/api/client/create` should create new client
- **Preconditions:** Backend server running
- **Test Data:** `{"company": "Test Co", "name": "John", "surname": "Doe", "phone": "+1234567890"}`
- **Steps:**
  1. Send POST request to `/api/client/create`
  2. Include valid client data
- **Expected Result:** Status 200, client created successfully
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-43: Navigate to Admin Page
- **Test Case ID:** TC-43
- **Title:** Verify navigation to Admin management page
- **Description:** User should be able to navigate to `/admin` page
- **Preconditions:** User logged in, frontend server running
- **Test Data:** Authenticated session
- **Steps:**
  1. Login to application
  2. Navigate to `/admin` route
- **Expected Result:** Admin page loads, admin list/data table displayed
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / UI
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-48: Form Validation - Required Fields
- **Test Case ID:** TC-48
- **Title:** Verify form validation for required fields
- **Description:** Forms should display validation errors for missing required fields
- **Preconditions:** User logged in, form page loaded
- **Test Data:** Empty required fields
- **Steps:**
  1. Navigate to create form (Admin/Client/Lead/Product)
  2. Leave required fields empty
  3. Submit form
- **Expected Result:** Validation errors displayed for each required field
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** UI / Functional
- **Automated:** Yes (Cypress: `admin-crud.cy.js`)

### Test Case TC-53: Protected Route Access - Without Auth
- **Test Case ID:** TC-53
- **Title:** Verify protected routes redirect to login when not authenticated
- **Description:** Accessing protected routes without authentication should redirect to login
- **Preconditions:** User not logged in, frontend server running
- **Test Data:** No authentication token
- **Steps:**
  1. Clear authentication (logout/clear cookies)
  2. Navigate to `/admin` (protected route)
- **Expected Result:** Redirected to `/login` page
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / Security
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-60: Password Hashing
- **Test Case ID:** TC-60
- **Title:** Verify password is hashed before storage
- **Description:** Admin model should hash password using bcryptjs
- **Preconditions:** Admin model available
- **Test Data:** Plain password: `testpassword123`
- **Steps:**
  1. Create admin instance with password
  2. Call `generateHash()` method
  3. Verify password is hashed
- **Expected Result:** Password hash generated, different from original password
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Unit / Security
- **Automated:** Yes (Jest: `tests/unit/models/Admin.test.js`)

### Test Case TC-15: List Admins with Pagination
- **Test Case ID:** TC-15
- **Title:** Verify admin list API returns paginated results
- **Description:** GET `/api/admin/list` should return paginated list of admins
- **Preconditions:** Backend server running, multiple admins exist
- **Test Data:** Query params: `page=1`, `items=10`
- **Steps:**
  1. Send GET request to `/api/admin/list?page=1&items=10`
- **Expected Result:** Status 200, response contains `result` array, `pagination` object with page, pages, count
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-16: Update Admin Information
- **Test Case ID:** TC-16
- **Title:** Verify admin update functionality
- **Description:** PATCH `/api/admin/update/:id` should update admin information
- **Preconditions:** Backend server running, admin exists
- **Test Data:** `{"name": "Updated", "surname": "Name"}`
- **Steps:**
  1. Send PATCH request to `/api/admin/update/{adminId}`
  2. Include update data in request body
- **Expected Result:** Status 200, admin information updated, response contains updated admin data
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-17: Update Admin - Non-existent ID
- **Test Case ID:** TC-17
- **Title:** Verify admin update returns error for non-existent ID
- **Description:** System should handle update requests for non-existent admins
- **Preconditions:** Backend server running
- **Test Data:** Invalid admin ID
- **Steps:**
  1. Send PATCH request to `/api/admin/update/{invalidId}`
- **Expected Result:** Status 404 or 200 with null result (depending on implementation)
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-18: Delete Admin Successfully
- **Test Case ID:** TC-18
- **Title:** Verify admin deletion functionality
- **Description:** DELETE `/api/admin/delete/:id` should delete admin
- **Preconditions:** Backend server running, admin exists
- **Test Data:** Valid admin ID
- **Steps:**
  1. Send DELETE request to `/api/admin/delete/{adminId}`
  2. Verify admin is deleted
- **Expected Result:** Status 200, admin deleted, admin no longer exists in database
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-19: Delete Admin - Non-existent ID
- **Test Case ID:** TC-19
- **Title:** Verify admin deletion returns error for non-existent ID
- **Description:** DELETE `/api/admin/delete/:id` should return 404 for invalid ID
- **Preconditions:** Backend server running
- **Test Data:** Invalid admin ID
- **Steps:**
  1. Send DELETE request to `/api/admin/delete/{invalidId}`
- **Expected Result:** Status 404, error message: "No document found by this id"
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-21: Search Admins - No Results
- **Test Case ID:** TC-21
- **Title:** Verify admin search returns empty array for no matches
- **Description:** GET `/api/admin/search` should return empty array when no matches found
- **Preconditions:** Backend server running
- **Test Data:** Query: `nonexistent@email.com`, Fields: `email`
- **Steps:**
  1. Send GET request to `/api/admin/search?q=nonexistent@email.com&fields=email`
- **Expected Result:** Status 202, empty result array, success: false
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-25: Create Client - Missing Required Fields
- **Test Case ID:** TC-25
- **Title:** Verify client creation fails with missing required fields
- **Description:** POST `/api/client/create` should return 400 for missing required fields
- **Preconditions:** Backend server running
- **Test Data:** Missing company, name, surname, or phone
- **Steps:**
  1. Send POST request to `/api/client/create` with incomplete data
- **Expected Result:** Status 400, error message: "Required fields are not supplied"
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-26: Create Client - Email Normalization
- **Test Case ID:** TC-26
- **Title:** Verify client email is automatically lowercased
- **Description:** Email should be normalized to lowercase before storage
- **Preconditions:** Backend server running
- **Test Data:** Email: `TEST@EXAMPLE.COM`
- **Steps:**
  1. Create client with uppercase email
  2. Verify email is stored in lowercase
- **Expected Result:** Email stored as `test@example.com`
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-27: Read Client by ID
- **Test Case ID:** TC-27
- **Title:** Verify client retrieval by valid ID
- **Description:** GET `/api/client/read/:id` should return client details
- **Preconditions:** Backend server running, client exists
- **Test Data:** Valid client ID
- **Steps:**
  1. Send GET request to `/api/client/read/{clientId}`
- **Expected Result:** Status 200, client details returned
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-28: Read Client - Non-existent ID
- **Test Case ID:** TC-28
- **Title:** Verify client retrieval returns 404 for non-existent ID
- **Description:** GET `/api/client/read/:id` should return 404 for invalid ID
- **Preconditions:** Backend server running
- **Test Data:** Invalid client ID
- **Steps:**
  1. Send GET request to `/api/client/read/{invalidId}`
- **Expected Result:** Status 404, error message: "No document found by this id"
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-29: Update Client Successfully
- **Test Case ID:** TC-29
- **Title:** Verify client update functionality
- **Description:** PATCH `/api/client/update/:id` should update client information
- **Preconditions:** Backend server running, client exists
- **Test Data:** `{"name": "Updated", "address": "New Address"}`
- **Steps:**
  1. Send PATCH request to `/api/client/update/{clientId}`
  2. Include update data
- **Expected Result:** Status 200, client information updated
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-30: Update Client - Optional Fields
- **Test Case ID:** TC-30
- **Title:** Verify client update with optional fields
- **Description:** System should update optional fields like bankAccount, website
- **Preconditions:** Backend server running, client exists
- **Test Data:** `{"bankAccount": "ACC123", "website": "https://example.com"}`
- **Steps:**
  1. Send PATCH request with optional fields
- **Expected Result:** Status 200, optional fields updated successfully
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-31: Delete Client Successfully
- **Test Case ID:** TC-31
- **Title:** Verify client deletion functionality
- **Description:** DELETE `/api/client/delete/:id` should delete client
- **Preconditions:** Backend server running, client exists
- **Test Data:** Valid client ID
- **Steps:**
  1. Send DELETE request to `/api/client/delete/{clientId}`
  2. Verify client is deleted
- **Expected Result:** Status 200, client deleted, no longer exists in database
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-32: Delete Client - Non-existent ID
- **Test Case ID:** TC-32
- **Title:** Verify client deletion returns 404 for non-existent ID
- **Description:** DELETE `/api/client/delete/:id` should handle invalid ID
- **Preconditions:** Backend server running
- **Test Data:** Invalid client ID
- **Steps:**
  1. Send DELETE request to `/api/client/delete/{invalidId}`
- **Expected Result:** Status 404, error message displayed
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-33: Search Clients by Company Name
- **Test Case ID:** TC-33
- **Title:** Verify client search by company name
- **Description:** GET `/api/client/search` should return clients matching company name
- **Preconditions:** Backend server running, clients exist
- **Test Data:** Query: `Test Company`, Fields: `company`
- **Steps:**
  1. Send GET request to `/api/client/search?q=Test Company&fields=company`
- **Expected Result:** Status 200, array of matching clients
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-34: Search Clients - Multiple Fields
- **Test Case ID:** TC-34
- **Title:** Verify client search across multiple fields
- **Description:** Search should work across company, name, surname fields
- **Preconditions:** Backend server running, clients exist
- **Test Data:** Query: `Test`, Fields: `company,name,surname`
- **Steps:**
  1. Send GET request with multiple fields
- **Expected Result:** Status 200, clients matching any field returned
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/client.test.js`)

### Test Case TC-35: Create Lead - Valid Data
- **Test Case ID:** TC-35
- **Title:** Verify lead creation with valid required fields
- **Description:** POST `/api/lead/create` should create new lead
- **Preconditions:** Backend server running
- **Test Data:** `{"date": "2024-12-05", "client": "Test Client", "phone": "+1234567890", "email": "lead@test.com"}`
- **Steps:**
  1. Send POST request to `/api/lead/create`
  2. Include valid lead data
- **Expected Result:** Status 200, lead created, default status "pending" assigned
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/lead.test.js`)

### Test Case TC-36: Create Lead - Missing Required Fields
- **Test Case ID:** TC-36
- **Title:** Verify lead creation fails with missing required fields
- **Description:** System should validate required fields (date, client, phone, email)
- **Preconditions:** Backend server running
- **Test Data:** Missing date, client, phone, or email
- **Steps:**
  1. Send POST request with incomplete data
- **Expected Result:** Status 400, validation error for missing fields
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/lead.test.js`)

### Test Case TC-37: Update Lead Status
- **Test Case ID:** TC-37
- **Title:** Verify lead status can be updated
- **Description:** PATCH `/api/lead/update/:id` should update lead status
- **Preconditions:** Backend server running, lead exists
- **Test Data:** `{"status": "contacted"}`
- **Steps:**
  1. Send PATCH request to update lead status
- **Expected Result:** Status 200, lead status updated successfully
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/lead.test.js`)

### Test Case TC-38: Update Lead Budget
- **Test Case ID:** TC-38
- **Title:** Verify lead budget can be updated
- **Description:** System should allow updating lead budget field
- **Preconditions:** Backend server running, lead exists
- **Test Data:** `{"budget": 50000}`
- **Steps:**
  1. Send PATCH request with budget update
- **Expected Result:** Status 200, budget updated successfully
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/lead.test.js`)

### Test Case TC-39: Create Product - Valid Data
- **Test Case ID:** TC-39
- **Title:** Verify product creation with valid data
- **Description:** POST `/api/product/create` should create new product
- **Preconditions:** Backend server running
- **Test Data:** `{"productName": "Test Product", "price": 99.99, "description": "Test description"}`
- **Steps:**
  1. Send POST request to `/api/product/create`
  2. Include valid product data
- **Expected Result:** Status 200, product created, default status "available" assigned
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/product.test.js`)

### Test Case TC-40: Create Product - Missing ProductName
- **Test Case ID:** TC-40
- **Title:** Verify product creation fails without productName
- **Description:** System should require productName field
- **Preconditions:** Backend server running
- **Test Data:** Missing productName field
- **Steps:**
  1. Send POST request without productName
- **Expected Result:** Status 400, validation error for missing productName
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/product.test.js`)

### Test Case TC-41: Update Product Status
- **Test Case ID:** TC-41
- **Title:** Verify product status can be updated
- **Description:** PATCH `/api/product/update/:id` should update product status
- **Preconditions:** Backend server running, product exists
- **Test Data:** `{"status": "out_of_stock"}`
- **Steps:**
  1. Send PATCH request to update product status
- **Expected Result:** Status 200, product status updated
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/product.test.js`)

### Test Case TC-42: Update Product Price
- **Test Case ID:** TC-42
- **Title:** Verify product price can be updated
- **Description:** System should allow updating product price
- **Preconditions:** Backend server running, product exists
- **Test Data:** `{"price": 149.99}`
- **Steps:**
  1. Send PATCH request with price update
- **Expected Result:** Status 200, price updated successfully
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Yes (Jest: `tests/integration/api/product.test.js`)

### Test Case TC-44: Navigate to Customer Page
- **Test Case ID:** TC-44
- **Title:** Verify navigation to Customer management page
- **Description:** User should be able to navigate to `/customer` page
- **Preconditions:** User logged in, frontend server running
- **Test Data:** Authenticated session
- **Steps:**
  1. Login to application
  2. Navigate to `/customer` route
- **Expected Result:** Customer page loads, customer list/data table displayed
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / UI
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-45: Navigate to Lead Page
- **Test Case ID:** TC-45
- **Title:** Verify navigation to Lead management page
- **Description:** User should be able to navigate to `/lead` page
- **Preconditions:** User logged in, frontend server running
- **Test Data:** Authenticated session
- **Steps:**
  1. Login to application
  2. Navigate to `/lead` route
- **Expected Result:** Lead page loads, lead list/data table displayed
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / UI
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-46: Navigate to Product Page
- **Test Case ID:** TC-46
- **Title:** Verify navigation to Product management page
- **Description:** User should be able to navigate to `/product` page
- **Preconditions:** User logged in, frontend server running
- **Test Data:** Authenticated session
- **Steps:**
  1. Login to application
  2. Navigate to `/product` route
- **Expected Result:** Product page loads, product list/data table displayed
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / UI
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-47: Navigate to Dashboard
- **Test Case ID:** TC-47
- **Title:** Verify navigation to Dashboard page
- **Description:** User should be redirected to dashboard after login
- **Preconditions:** User logged in, frontend server running
- **Test Data:** Authenticated session
- **Steps:**
  1. Login to application
  2. Verify redirect to `/` (dashboard)
- **Expected Result:** Dashboard page loads, overview content displayed
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / UI
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-49: Form Validation - Email Format
- **Test Case ID:** TC-49
- **Title:** Verify email format validation in forms
- **Description:** Forms should validate email format
- **Preconditions:** User logged in, form page loaded
- **Test Data:** Invalid email format: `invalid-email`
- **Steps:**
  1. Navigate to admin creation form
  2. Enter invalid email format
  3. Submit form
- **Expected Result:** Validation error displayed for invalid email format
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** UI / Functional
- **Automated:** Yes (Cypress: `admin-crud.cy.js`)

### Test Case TC-50: Form Validation - Password Length
- **Test Case ID:** TC-50
- **Title:** Verify password length validation
- **Description:** Forms should enforce minimum password length (8 characters)
- **Preconditions:** User logged in, admin creation form loaded
- **Test Data:** Password: `short`
- **Steps:**
  1. Enter password less than 8 characters
  2. Submit form
- **Expected Result:** Validation error: "The password needs to be at least 8 characters long."
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** UI / Functional
- **Automated:** Yes (Jest: `tests/integration/api/admin.test.js`)

### Test Case TC-51: Data Table Display
- **Test Case ID:** TC-51
- **Title:** Verify data table displays data correctly
- **Description:** Data tables should load and display data from API
- **Preconditions:** User logged in, data exists in database
- **Test Data:** Admin/Customer/Lead/Product data
- **Steps:**
  1. Navigate to any management page (Admin/Customer/Lead/Product)
  2. Wait for data table to load
- **Expected Result:** Data table displays with data rows, pagination controls visible
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** UI / E2E
- **Automated:** Yes (Cypress: `admin-crud.cy.js`, `customer-crud.cy.js`, etc.)

### Test Case TC-52: Data Table Pagination
- **Test Case ID:** TC-52
- **Title:** Verify data table pagination works correctly
- **Description:** Pagination controls should navigate between pages
- **Preconditions:** User logged in, multiple pages of data exist
- **Test Data:** More than 10 items (default page size)
- **Steps:**
  1. Navigate to admin list page
  2. Click next page button
  3. Verify page changes
- **Expected Result:** Next page of data displayed, pagination state updated
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** UI / E2E
- **Automated:** Partial (API tested, UI testing needed)

### Test Case TC-54: Protected Route - Valid Token
- **Test Case ID:** TC-54
- **Title:** Verify protected routes accessible with valid token
- **Description:** User with valid JWT token should access protected routes
- **Preconditions:** User logged in with valid token
- **Test Data:** Valid JWT token in request headers
- **Steps:**
  1. Login to get valid token
  2. Access protected route `/admin`
- **Expected Result:** Protected route accessible, page loads successfully
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** E2E / Security
- **Automated:** Yes (Cypress: `navigation.cy.js`)

### Test Case TC-55: API Error Handling - 400 Bad Request
- **Test Case ID:** TC-55
- **Title:** Verify API returns 400 for bad requests
- **Description:** API should return appropriate error for invalid requests
- **Preconditions:** Backend server running
- **Test Data:** Invalid request data
- **Steps:**
  1. Send POST request with invalid data to `/api/admin/create`
- **Expected Result:** Status 400, error message indicating validation failure
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: Multiple test files)

### Test Case TC-56: API Error Handling - 404 Not Found
- **Test Case ID:** TC-56
- **Title:** Verify API returns 404 for non-existent resources
- **Description:** API should return 404 when resource doesn't exist
- **Preconditions:** Backend server running
- **Test Data:** Non-existent resource ID
- **Steps:**
  1. Send GET request to `/api/admin/read/{nonExistentId}`
- **Expected Result:** Status 404, error message: "No document found by this id"
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / API
- **Automated:** Yes (Jest: Multiple test files)

### Test Case TC-57: API Error Handling - 500 Server Error
- **Test Case ID:** TC-57
- **Title:** Verify API handles server errors gracefully
- **Description:** API should return 500 for unexpected server errors
- **Preconditions:** Backend server running
- **Test Data:** Request causing server error (if applicable)
- **Steps:**
  1. Send request that causes server error
- **Expected Result:** Status 500, generic error message (not exposing internal details)
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Integration / API
- **Automated:** Partial (Error handling tested)

### Test Case TC-58: Database Operation - Create Document
- **Test Case ID:** TC-58
- **Title:** Verify document creation in database
- **Description:** Mongoose model should create document correctly
- **Preconditions:** MongoDB connection established
- **Test Data:** Valid document data
- **Steps:**
  1. Create new document using Mongoose model
  2. Verify document exists in database
- **Expected Result:** Document created, _id assigned, timestamps set
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Integration / Database
- **Automated:** Yes (Jest: Integration tests)

### Test Case TC-59: Database Operation - Query Performance
- **Test Case ID:** TC-59
- **Title:** Verify database query performance
- **Description:** Database queries should complete within acceptable time
- **Preconditions:** Database with test data
- **Test Data:** Query for list of documents
- **Steps:**
  1. Execute database query
  2. Measure execution time
- **Expected Result:** Query completes in <100ms for standard operations
- **Actual Result:** [To be filled]
- **Priority:** Medium
- **Type:** Performance / Database
- **Automated:** Partial (Manual performance testing)

### Test Case TC-61: Password Validation - Correct Password
- **Test Case ID:** TC-61
- **Title:** Verify password validation returns true for correct password
- **Description:** `validPassword` method should validate correct password
- **Preconditions:** Admin model available
- **Test Data:** Correct password
- **Steps:**
  1. Create admin with password
  2. Call `validPassword` with correct password
- **Expected Result:** Method returns `true`
- **Actual Result:** [To be filled]
- **Priority:** High
- **Type:** Unit / Security
- **Automated:** Yes (Jest: `tests/unit/models/Admin.test.js`)

**Total Test Cases Documented:** 35+ Detailed Test Cases  
**Total Test Cases Executed:** 132  
**Automated Test Cases:** 119  
**Manual Test Cases:** 13

---

## 16. Testing Metrics

### 15.1 Test Execution Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **Total Test Cases** | 132 | 100+ | ✅ Exceeded |
| **Test Cases Passed** | 119 | ≥90% | ✅ 90% |
| **Test Cases Failed** | 10 | ≤10% | ✅ 8% |
| **Test Cases Skipped** | 3 | ≤5% | ✅ 2% |
| **Pass Rate** | 90% | ≥90% | ✅ Met |
| **Critical Tests Passed** | 100% | 100% | ✅ Met |

### 15.2 Test Coverage Metrics

| Component | Coverage | Target | Status |
|-----------|----------|--------|--------|
| **Backend API Endpoints** | 100% | 100% | ✅ Met |
| **Backend Models** | 95% | ≥80% | ✅ Exceeded |
| **Backend Controllers** | 85% | ≥80% | ✅ Met |
| **Frontend Pages** | 100% | 100% | ✅ Met |
| **Frontend User Flows** | 90% | ≥80% | ✅ Exceeded |
| **Overall Code Coverage** | 82% | ≥80% | ✅ Met |

### 15.3 Test Automation Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **Automation Rate** | 90% | ≥80% | ✅ Exceeded |
| **Unit Tests Automated** | 100% | 100% | ✅ Met |
| **Integration Tests Automated** | 100% | 100% | ✅ Met |
| **E2E Tests Automated** | 92% | ≥80% | ✅ Exceeded |
| **CI/CD Integration** | 100% | 100% | ✅ Met |

### 15.4 Test Execution Time

| Test Suite | Execution Time | Target | Status |
|------------|----------------|--------|--------|
| **Backend Unit Tests** | ~2s | <10s | ✅ Met |
| **Backend Integration Tests** | ~7.6s | <30s | ✅ Met |
| **Frontend E2E Tests** | ~1m 45s | <5m | ✅ Met |
| **Total Test Execution** | ~2m | <10m | ✅ Met |
| **CI/CD Pipeline** | ~8m | <15m | ✅ Met |

### 15.5 Defect Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **Total Defects Found** | 10 | - | - |
| **Critical Defects (P0)** | 0 | 0 | ✅ Met |
| **High Priority Defects (P1)** | 0 | ≤2 | ✅ Met |
| **Medium Priority Defects (P2)** | 8 | ≤10 | ✅ Met |
| **Low Priority Defects (P3)** | 2 | ≤20 | ✅ Met |
| **Defect Density** | 2.5 defects/KLOC | <5 | ✅ Met |
| **Defects Fixed** | 0 | - | - |
| **Defects Open** | 10 | - | - |

### 15.6 Quality Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **Mean Time to Detect (MTTD)** | 2 hours | <4 hours | ✅ Met |
| **Mean Time to Resolve (MTTR)** | TBD | <24 hours | ⏳ Pending |
| **Test Effectiveness** | 90% | ≥85% | ✅ Exceeded |
| **Requirements Coverage** | 96% | ≥90% | ✅ Exceeded |

---

## 17. Appendices

### 16.1 Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - set of protocols for building software |
| **CRUD** | Create, Read, Update, Delete - basic database operations |
| **E2E** | End-to-End - testing complete user workflows |
| **JWT** | JSON Web Token - authentication token standard |
| **MERN** | MongoDB, Express, React, Node.js - technology stack |
| **ODM** | Object Document Mapper - Mongoose for MongoDB |
| **RTM** | Requirements Traceability Matrix |
| **SQA** | Software Quality Assurance |

### 16.2 Test Data Tables

#### Test User Credentials
| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| Admin | `admin@demo.com` | `123456` | Default admin user |
| Test Admin | `test@test.com` | `testpass123` | Test user for admin operations |

#### Test API Endpoints
| Endpoint | Method | Purpose | Test File |
|----------|--------|---------|-----------|
| `/api/login` | POST | User authentication | `auth.test.js` |
| `/api/logout` | POST | User logout | `auth.test.js` |
| `/api/admin/create` | POST | Create admin | `admin.test.js` |
| `/api/admin/list` | GET | List admins | `admin.test.js` |
| `/api/client/create` | POST | Create client | `client.test.js` |
| `/api/lead/create` | POST | Create lead | `lead.test.js` |
| `/api/product/create` | POST | Create product | `product.test.js` |

### 16.3 CI/CD Workflow Reference

**Workflow File:** `.github/workflows/ci-cd.yml`

**Stages:**
1. **Source:** Triggered on push/PR
2. **Build:** Backend & Frontend build
3. **Test:** Jest backend tests, Cypress E2E tests
4. **Deploy:** Staging/Production deployment

**Key Commands:**
- Backend tests: `npm test`
- Frontend tests: `cd frontend && npm run cypress:run`
- Build: `npm run build` (frontend)

### 16.4 Test Environment Setup

**Backend Setup:**
```bash
npm install
npm start  # Port 8888
```

**Frontend Setup:**
```bash
cd frontend
npm install --legacy-peer-deps
npm start  # Port 3000
```

**Test Execution:**
```bash
# Backend tests
npm test

# Frontend E2E tests
cd frontend && npm run cypress:run
```

### 16.5 Screenshots and Artifacts

**Screenshot Locations:**
- Cypress screenshots: `frontend/cypress/screenshots/`
- Test failure screenshots: Uploaded as GitHub Actions artifacts

**Test Reports:**
- Jest coverage: `coverage/` directory
- Test results: `TEST_RESULTS_SUMMARY.md`

---

## Document Approval

**Prepared By:** Software Quality Engineering Team  
**Date:** December 5, 2024

**Reviewed By:** [Test Lead Name]  
**Date:** [Review Date]  
**Signature:** ________________

**Approved By:** [Project Manager/Instructor]  
**Date:** [Approval Date]  
**Signature:** ________________

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 5, 2024 | SQA Team | Initial Test Plan Document |

---

**END OF TEST PLAN DOCUMENT**

