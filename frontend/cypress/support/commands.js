// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to login a user
 * @example cy.login('admin@demo.com', '123456')
 */
Cypress.Commands.add('login', (email = 'admin@demo.com', password = '123456') => {
  cy.visit('/login')
  cy.get('input[placeholder="admin@demo.com"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  // Wait for navigation to dashboard
  cy.url().should('not.include', '/login')
  cy.wait(1000) // Wait for page to load
})

/**
 * Custom command to logout
 * @example cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.visit('/logout')
  cy.url().should('include', '/login')
})

/**
 * Custom command to navigate to a page
 * @example cy.navigateTo('/admin')
 */
Cypress.Commands.add('navigateTo', (path) => {
  cy.visit(path)
  cy.wait(1000) // Wait for page to load
})

/**
 * Custom command to wait for API calls to complete
 * @example cy.waitForApi()
 */
Cypress.Commands.add('waitForApi', () => {
  cy.intercept('GET', '**/api/**').as('apiCall')
  cy.wait('@apiCall', { timeout: 10000 })
})

/**
 * Custom command to take screenshot with descriptive name
 * @example cy.takeScreenshot('TC-01-Happy-Path')
 */
Cypress.Commands.add('takeScreenshot', (testCaseName) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const screenshotName = `${testCaseName}-${timestamp}`
  cy.screenshot(screenshotName, { overwrite: true })
  cy.log(`📸 Screenshot saved: ${screenshotName}`)
})

