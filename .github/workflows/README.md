# CI/CD Pipeline Documentation

## Overview

This directory contains GitHub Actions workflows for Continuous Integration and Continuous Deployment (CI/CD) of the MERN Admin Application.

## Workflows

### 1. `ci-cd.yml` - Main CI/CD Pipeline

The main pipeline that orchestrates the entire CI/CD process with the following stages:

#### Pipeline Stages

1. **Source Stage** (Trigger)
   - Triggers on:
     - Push to `master`, `develop`, or `feature/sqa-ci-cd-implementation` branches
     - Pull requests to `master` or `develop`
     - Manual workflow dispatch
   - **Tools:** GitHub Actions, Git

2. **Build Stage**
   - Installs dependencies for both backend and frontend
   - Verifies backend code syntax
   - Builds frontend React application
   - Creates build artifacts
   - **Tools:** npm, Node.js, GitHub Actions

3. **Test Stage**
   - **Backend Tests:**
     - Sets up MongoDB test database
     - Runs unit and integration tests
     - Generates test coverage reports
     - **Tools:** Jest, Supertest, MongoDB
   - **Frontend Tests:**
     - Runs unit tests
     - Runs E2E tests with Cypress
     - **Tools:** Jest, Cypress

4. **Staging Stage**
   - Deploys to staging environment
   - Performs health checks
   - **Triggers:** Only on `develop` or feature branches
   - **Tools:** AWS CodeDeploy, GitHub Actions (configurable)

5. **Production Stage**
   - Deploys to production environment
   - Performs health checks
   - Sends deployment notifications
   - **Triggers:** Only on `master` branch
   - **Tools:** AWS CodeDeploy, Azure DevOps, GitHub Actions (configurable)

## Workflow Status Badge

Add this to your README.md to show pipeline status:

```markdown
![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/CD%20Pipeline/badge.svg)
```

## Environment Variables

The following secrets need to be configured in GitHub repository settings:

### Required Secrets (for deployment)

- `MONGODB_URI` - MongoDB connection string for production
- `JWT_SECRET` - JWT secret key for production
- `AWS_ACCESS_KEY_ID` - AWS access key (if using AWS deployment)
- `AWS_SECRET_ACCESS_KEY` - AWS secret key (if using AWS deployment)
- `DEPLOYMENT_KEY` - SSH key for server deployment (if applicable)

### Optional Secrets

- `SLACK_WEBHOOK_URL` - For deployment notifications
- `SENTRY_DSN` - For error tracking
- `NEW_RELIC_LICENSE_KEY` - For performance monitoring

## Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its value

## Local Testing

To test the pipeline locally before pushing:

```bash
# Install act (GitHub Actions local runner)
# macOS
brew install act

# Run workflow locally
act push
```

## Pipeline Status

Check pipeline status:
- Go to **Actions** tab in GitHub repository
- View workflow runs and their status
- Click on a run to see detailed logs

## Troubleshooting

### Build Failures

1. Check Node.js version compatibility
2. Verify all dependencies are in `package.json`
3. Check for syntax errors in code

### Test Failures

1. Verify MongoDB test database is accessible
2. Check test environment variables
3. Review test logs for specific failures

### Deployment Failures

1. Verify environment secrets are set correctly
2. Check deployment target accessibility
3. Review deployment logs for errors

## Next Steps

1. ✅ Source Stage - Configured
2. ✅ Build Stage - Configured
3. ⏳ Test Stage - Tests to be implemented
4. ⏳ Staging Stage - Deployment to be configured
5. ⏳ Production Stage - Deployment to be configured

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Project Test Plan](./../../TEST_PLAN.md)
- [Project Plan](./../../PROJECT_PLAN.md)

