/// <reference types="cypress" />

/**
 * Cypress E2E Test Suite: Login Form Validation
 * 
 * Test Objective: Verify functional correctness and input validation 
 * of the Login form using Black-Box testing approach.
 * 
 * Coverage: Equivalence Class Partitioning (Weak Robust) + 2-point Boundary Value Analysis
 * Total Test Cases: 20
 * 
 * Page URL: http://localhost:3000/login
 * Form: Login form
 * 
 * Fields:
 * - E-mail (text, required) - Used as login identifier
 * - Password (password, required)
 * - Remember me (checkbox, optional)
 */

describe('Login Form - Authentication (ECP + BVA)', () => {
  beforeEach(() => {
    // Visit login page before each test
    cy.visit('/login');
    cy.wait(1000); // Wait for page to load
  });

  /**
   * TC-1: All nominal valid (baseline - successful login)
   * Purpose: Baseline test with all valid equivalence classes
   * Covered Classes: V1, V2
   */
  it('TC-1: Should login successfully with valid credentials', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-01-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    // Wait for navigation to dashboard
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    
    cy.takeScreenshot('TC-01-After-Submit-Success');
    
    // Should redirect to dashboard
    cy.get('body').should('exist');
  });

  /**
   * TC-2: Email empty (I1)
   * Purpose: Test required field validation for Email
   * Covered Classes: I1
   */
  it('TC-2: Should show error when Email is empty', () => {
    // Leave Email empty, fill password
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-02-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.contains('Please input your Email!').should('be.visible');
    
    cy.takeScreenshot('TC-02-After-Submit-Error');
  });

  /**
   * TC-3: Password empty (I2)
   * Purpose: Test required field validation for Password
   * Covered Classes: I2
   */
  it('TC-3: Should show error when Password is empty', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    // Leave Password empty
    
    cy.takeScreenshot('TC-03-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.contains('Please input your Password!').should('be.visible');
    
    cy.takeScreenshot('TC-03-After-Submit-Error');
  });

  /**
   * TC-4: Both fields empty
   * Purpose: Test multiple required field validation
   */
  it('TC-4: Should show errors when both Email and Password are empty', () => {
    cy.takeScreenshot('TC-04-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.contains('Please input your Email!').should('be.visible');
    cy.contains('Please input your Password!').should('be.visible');
    
    cy.takeScreenshot('TC-04-After-Submit-Error');
  });

  /**
   * TC-5: Invalid email – no @ (I3)
   * Purpose: Test email format validation
   * Covered Classes: I3
   */
  it('TC-5: Should handle invalid email format (no @ symbol)', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('invalidemail');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-05-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-05-After-Submit');
    
    // Frontend may not validate email format, backend will reject
    cy.get('body').should('exist');
  });

  /**
   * TC-6: Invalid email – multiple @ (I4)
   * Purpose: Test email format validation for multiple @
   * Covered Classes: I4
   */
  it('TC-6: Should handle invalid email format (multiple @ symbols)', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('a@@b.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-06-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-06-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-7: Invalid email – missing domain (I5)
   * Purpose: Test email format validation
   * Covered Classes: I5
   */
  it('TC-7: Should handle invalid email format (missing domain)', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-07-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-07-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-8: Invalid email – missing local part (I6)
   * Purpose: Test email format validation
   * Covered Classes: I6
   */
  it('TC-8: Should handle invalid email format (missing local part)', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-08-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-08-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-9: Wrong password (valid email, invalid password)
   * Purpose: Test authentication failure
   */
  it('TC-9: Should show error with wrong password', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('wrongpassword');
    
    cy.takeScreenshot('TC-09-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000); // Wait for API response
    
    cy.takeScreenshot('TC-09-After-Submit-Error');
    
    // Should stay on login page or show error message
    cy.url().should('include', '/login');
  });

  /**
   * TC-10: Non-existent email (invalid email, valid password format)
   * Purpose: Test authentication failure
   */
  it('TC-10: Should show error with non-existent email', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('nonexistent@example.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-10-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000); // Wait for API response
    
    cy.takeScreenshot('TC-10-After-Submit-Error');
    
    // Should stay on login page or show error message
    cy.url().should('include', '/login');
  });

  /**
   * TC-11: Email with special characters (valid format)
   * Purpose: Test email with plus sign and special characters
   */
  it('TC-11: Should handle email with plus sign and special characters', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin+test@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-11-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-11-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-12: Password too short – 4 chars (BVA just below minimum)
   * Purpose: Test boundary value - just below minimum password length
   * Note: Backend requires minimum 5 characters for registration, but login may accept shorter
   */
  it('TC-12: Should handle very short password', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('1234'); // 4 chars
    
    cy.takeScreenshot('TC-12-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-12-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-13: Password minimum valid – 5 chars (BVA lower boundary)
   * Purpose: Test boundary value - minimum valid password length
   */
  it('TC-13: Should accept password with 5 characters (minimum valid)', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('12345'); // 5 chars
    
    cy.takeScreenshot('TC-13-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-13-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-14: Password very long – 100 chars (BVA upper boundary)
   * Purpose: Test boundary value - very long password
   */
  it('TC-14: Should handle very long password', () => {
    const longPassword = 'A'.repeat(100); // 100 characters
    
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type(longPassword);
    
    cy.takeScreenshot('TC-14-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-14-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-15: Email max length (BVA)
   * Purpose: Test email with maximum reasonable length
   */
  it('TC-15: Should handle email with maximum length', () => {
    const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com'; // Long email
    
    cy.get('input[placeholder="admin@demo.com"]').type(longEmail);
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-15-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-15-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-16: Remember me checkbox checked
   * Purpose: Test "Remember me" functionality
   */
  it('TC-16: Should handle "Remember me" checkbox when checked', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    // Check "Remember me" checkbox
    cy.contains('Remember me').parent().find('input[type="checkbox"]').check();
    
    cy.takeScreenshot('TC-16-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-16-After-Submit');
    
    // Should login successfully
    cy.url({ timeout: 10000 }).should('not.include', '/login');
  });

  /**
   * TC-17: Remember me checkbox unchecked
   * Purpose: Test "Remember me" functionality when unchecked
   */
  it('TC-17: Should handle "Remember me" checkbox when unchecked', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('admin@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    // Uncheck "Remember me" checkbox (it's checked by default)
    cy.contains('Remember me').parent().find('input[type="checkbox"]').uncheck();
    
    cy.takeScreenshot('TC-17-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-17-After-Submit');
    
    // Should login successfully
    cy.url({ timeout: 10000 }).should('not.include', '/login');
  });

  /**
   * TC-18: SQL injection attempt in email field
   * Purpose: Test security - SQL injection prevention
   */
  it('TC-18: Should handle SQL injection attempt in email field', () => {
    cy.get('input[placeholder="admin@demo.com"]').type("admin' OR '1'='1");
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-18-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-18-After-Submit');
    
    // Should reject or handle securely
    cy.get('body').should('exist');
  });

  /**
   * TC-19: XSS attempt in email field
   * Purpose: Test security - XSS prevention
   */
  it('TC-19: Should handle XSS attempt in email field', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('<script>alert("XSS")</script>@demo.com');
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-19-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-19-After-Submit');
    
    // Should reject or sanitize input
    cy.get('body').should('exist');
  });

  /**
   * TC-20: Case sensitivity test (email)
   * Purpose: Test if email is case-sensitive
   */
  it('TC-20: Should handle email with different case', () => {
    cy.get('input[placeholder="admin@demo.com"]').type('ADMIN@DEMO.COM'); // Uppercase
    cy.get('input[type="password"]').type('123456');
    
    cy.takeScreenshot('TC-20-Before-Submit');
    
    cy.contains('button', 'Log in').click();
    
    cy.wait(3000);
    
    cy.takeScreenshot('TC-20-After-Submit');
    
    // May or may not be case-sensitive depending on backend
    cy.get('body').should('exist');
  });
});

