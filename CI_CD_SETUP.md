# CI/CD Pipeline Setup Guide

## Overview

This document provides instructions for setting up and configuring the CI/CD pipeline for the MERN Admin Application.

## Pipeline Architecture

```
┌─────────────┐
│   Source    │  ← GitHub Push/PR triggers
│   (GitHub)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Build    │  ← Install dependencies, compile code
│   (npm)     │
└──────┬──────┘
       │
       ├─────────────────┐
       ▼                 ▼
┌─────────────┐   ┌─────────────┐
│ Backend     │   │ Frontend    │
│ Tests       │   │ Tests       │
│ (Jest)      │   │ (Jest/Cyp)  │
└──────┬──────┘   └──────┬──────┘
       │                 │
       └────────┬────────┘
                ▼
         ┌─────────────┐
         │   Staging   │  ← Deploy to staging (develop branch)
         │  Deployment │
         └──────┬──────┘
                │
                ▼
         ┌─────────────┐
         │ Production  │  ← Deploy to production (master branch)
         │ Deployment  │
         └─────────────┘
```

## Stage 1: Source (✅ Configured)

### Configuration
- **Location:** `.github/workflows/ci-cd.yml`
- **Triggers:**
  - Push to `master`, `develop`, `feature/sqa-ci-cd-implementation`
  - Pull requests to `master` or `develop`
  - Manual workflow dispatch

### Verification
```bash
# Push code to trigger pipeline
git push origin feature/sqa-ci-cd-implementation

# Check GitHub Actions tab to see pipeline running
```

## Stage 2: Build (✅ Configured)

### Backend Build
- Installs npm dependencies
- Verifies code syntax
- No compilation needed (Node.js)

### Frontend Build
- Installs npm dependencies
- Builds React application using `craco build`
- Creates production-ready build artifacts

### Build Artifacts
- Frontend build stored as GitHub Actions artifact
- Available for download and deployment

## Stage 3: Test (⏳ To be Implemented)

### Backend Testing Setup

#### Prerequisites
```bash
# Install Jest and testing dependencies
npm install --save-dev jest supertest @types/jest
```

#### Test Structure
```
tests/
├── unit/
│   ├── controllers/
│   ├── models/
│   └── utils/
├── integration/
│   ├── api/
│   └── auth/
└── setup/
    └── test-db.js
```

#### Running Tests Locally
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- adminController.test.js
```

### Frontend Testing Setup

#### Prerequisites
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev cypress
```

#### Test Structure
```
frontend/
├── src/
│   └── __tests__/
│       ├── components/
│       └── pages/
└── cypress/
    ├── e2e/
    ├── fixtures/
    └── support/
```

#### Running Tests Locally
```bash
# Unit tests
cd frontend
npm test

# E2E tests
npm run cypress:open  # Interactive
npm run cypress:run   # Headless
```

## Stage 4: Staging Deployment (⏳ To be Configured)

### Option 1: AWS CodeDeploy

1. **Setup AWS CodeDeploy Application**
   ```bash
   aws deploy create-application --application-name mern-admin-staging
   ```

2. **Configure GitHub Actions**
   - Add AWS credentials to GitHub Secrets
   - Update `deploy-staging` job in workflow

3. **Deployment Script**
   - Create `appspec.yml` for CodeDeploy
   - Configure deployment scripts

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create mern-admin-staging
   ```

3. **Configure GitHub Actions**
   - Add `HEROKU_API_KEY` to GitHub Secrets
   - Update workflow to deploy to Heroku

### Option 3: Vercel/Netlify (Frontend Only)

1. **Vercel Setup**
   - Connect GitHub repository to Vercel
   - Configure build settings
   - Set environment variables

2. **Netlify Setup**
   - Connect GitHub repository to Netlify
   - Configure build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/build`

## Stage 5: Production Deployment (⏳ To be Configured)

Similar to staging, but with production environment variables and stricter access controls.

## Environment Variables

### GitHub Secrets Setup

1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

#### Required
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - JWT secret for production
- `NODE_ENV` - Set to `production`

#### Optional (for deployment)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `HEROKU_API_KEY`
- `DEPLOYMENT_HOST`
- `DEPLOYMENT_USER`
- `DEPLOYMENT_SSH_KEY`

### Environment-Specific Variables

#### Development
- Stored in `.variables.env` (not committed)
- Used for local development

#### Staging
- Stored in GitHub Secrets
- Used in staging deployment job

#### Production
- Stored in GitHub Secrets
- Used in production deployment job

## Monitoring and Error Tracking

### Sentry Setup

1. **Create Sentry Project**
   - Sign up at https://sentry.io
   - Create new project
   - Get DSN

2. **Add to GitHub Secrets**
   - `SENTRY_DSN` - Sentry project DSN

3. **Install Sentry SDK**
   ```bash
   # Backend
   npm install @sentry/node

   # Frontend
   cd frontend
   npm install @sentry/react
   ```

### New Relic Setup (Optional)

1. **Create New Relic Account**
2. **Add License Key to Secrets**
   - `NEW_RELIC_LICENSE_KEY`
3. **Install New Relic Agent**
   ```bash
   npm install newrelic
   ```

## Health Checks

### Backend Health Endpoint

Create a health check endpoint in `app.js`:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Frontend Health Check

The frontend build should be accessible and load without errors.

## Pipeline Status Badge

Add to `README.md`:

```markdown
![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/CD%20Pipeline/badge.svg)
```

## Troubleshooting

### Pipeline Not Triggering

1. Check branch name matches workflow triggers
2. Verify `.github/workflows/ci-cd.yml` is in the repository
3. Check GitHub Actions is enabled for the repository

### Build Failures

1. **Node Version Mismatch**
   - Update `NODE_VERSION` in workflow file
   - Ensure compatibility with package.json

2. **Dependency Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`
   - Reinstall: `npm install`

3. **Frontend Build Issues**
   - Verify `NODE_OPTIONS=--openssl-legacy-provider` is set
   - Check for TypeScript/ESLint errors

### Test Failures

1. **MongoDB Connection**
   - Verify MongoDB service is running in workflow
   - Check connection string format

2. **Test Timeout**
   - Increase timeout in test configuration
   - Check for hanging async operations

### Deployment Failures

1. **Authentication Issues**
   - Verify deployment credentials in GitHub Secrets
   - Check SSH key permissions

2. **Environment Variables**
   - Ensure all required variables are set
   - Verify variable names match code

## Next Steps

1. ✅ Source Stage - Complete
2. ✅ Build Stage - Complete
3. ⏳ Implement backend tests
4. ⏳ Implement frontend tests
5. ⏳ Configure staging deployment
6. ⏳ Configure production deployment
7. ⏳ Set up monitoring

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io)
- [AWS CodeDeploy Documentation](https://docs.aws.amazon.com/codedeploy)
- [Project Test Plan](./TEST_PLAN.md)

