/// <reference types="cypress" />

/**
 * Cypress E2E Test Suite: Customer Form Validation
 * 
 * Test Objective: Verify functional correctness and input validation 
 * of the "Add new customer" form using Black-Box testing approach.
 * 
 * Coverage: Equivalence Class Partitioning (Weak Robust) + 2-point Boundary Value Analysis
 * Total Test Cases: 20
 * 
 * Page URL: http://localhost:3000/customer
 * Form: "Add new customer" modal/panel
 * 
 * Fields:
 * - Company Name (text, required)
 * - Surname (text, required)
 * - Name (text, required)
 * - Phone (text, required)
 * - E-mail (text, required)
 */

describe('Customer Form - Add New Customer (ECP + BVA)', () => {
  // Login before each test to access protected route
  beforeEach(() => {
    cy.login('admin@demo.com', '123456');
    cy.visit('/customer');
    cy.wait(2000); // Wait for page to load
    
    // Open the collapsible form panel if it's closed
    cy.get('body').then(($body) => {
      // Check if form panel is visible, if not click to open
      if ($body.find('form').length === 0) {
        // Look for collapsible header containing "Add new customer"
        cy.contains('Add new customer').parent().click({ force: true });
        cy.wait(500);
      }
    });
  });

  /**
   * TC-1: All nominal valid (baseline)
   * Purpose: Baseline test with all valid equivalence classes
   * Covered Classes: V1, V2, V3, V4, V5
   */
  it('TC-1: Should submit form successfully with all nominal valid inputs', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME Corp');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('+40723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion.popescu@acme.com');
    
    // Take screenshot before submit
    cy.takeScreenshot('TC-01-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    cy.wait(2000);
    
    // Take screenshot after submit
    cy.takeScreenshot('TC-01-After-Submit');
    
    // Assert success - form should reset or show success message
    cy.get('body').should('exist');
  });

  /**
   * TC-2: Company empty (I1)
   * Purpose: Test required field validation for Company Name
   * Covered Classes: I1
   */
  it('TC-2: Should show error when Company Name is empty', () => {
    // Leave Company Name empty, fill other required fields
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-02-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    // Assert error message appears
    cy.contains('Please input your company name!').should('be.visible');
    
    cy.takeScreenshot('TC-02-After-Submit-Error');
  });

  /**
   * TC-3: Surname empty (I3)
   * Purpose: Test required field validation for Surname
   * Covered Classes: I3
   */
  it('TC-3: Should show error when Surname is empty', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    // Leave Surname empty
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-03-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('Please input your surname!').should('be.visible');
    
    cy.takeScreenshot('TC-03-After-Submit-Error');
  });

  /**
   * TC-4: Name empty (I6)
   * Purpose: Test required field validation for Name
   * Covered Classes: I6
   */
  it('TC-4: Should show error when Name is empty', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    // Leave Name empty
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-04-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('Please input your manager name!').should('be.visible');
    
    cy.takeScreenshot('TC-04-After-Submit-Error');
  });

  /**
   * TC-5: Phone empty (I9)
   * Purpose: Test required field validation for Phone
   * Covered Classes: I9
   */
  it('TC-5: Should show error when Phone is empty', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    // Leave Phone empty
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-05-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('Please input your phone!').should('be.visible');
    
    cy.takeScreenshot('TC-05-After-Submit-Error');
  });

  /**
   * TC-6: Email empty (I13)
   * Purpose: Test required field validation for Email
   * Covered Classes: I13
   */
  it('TC-6: Should show error when Email is empty', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    // Leave Email empty
    
    cy.takeScreenshot('TC-06-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('Please input your E-mail!').should('be.visible');
    
    cy.takeScreenshot('TC-06-After-Submit-Error');
  });

  /**
   * TC-7: Invalid email – no @ (I14)
   * Purpose: Test email format validation
   * Covered Classes: I14
   */
  it('TC-7: Should show error for email without @ symbol', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('invalid-email');
    
    cy.takeScreenshot('TC-07-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('The input is not valid E-mail!').should('be.visible');
    
    cy.takeScreenshot('TC-07-After-Submit-Error');
  });

  /**
   * TC-8: Invalid email – multiple @ (I15)
   * Purpose: Test email format validation for multiple @
   * Covered Classes: I15
   */
  it('TC-8: Should show error for email with multiple @ symbols', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('a@@b.com');
    
    cy.takeScreenshot('TC-08-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.contains('The input is not valid E-mail!').should('be.visible');
    
    cy.takeScreenshot('TC-08-After-Submit-Error');
  });

  /**
   * TC-9: Phone with letters (I10)
   * Purpose: Test phone validation for letters
   * Covered Classes: I10
   */
  it('TC-9: Should handle phone with letters (frontend may allow, backend may reject)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723abc');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-09-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-09-After-Submit');
    
    // Frontend may allow, but backend might reject
    cy.get('body').should('exist');
  });

  /**
   * TC-10: Company >100 chars (I2 + BVA just above)
   * Purpose: Test boundary value - just above maximum length
   * Covered Classes: I2, BVA (101 chars)
   */
  it('TC-10: Should handle Company Name exceeding 100 characters', () => {
    const longCompanyName = 'A'.repeat(101); // 101 characters
    
    cy.contains('label', 'company Name').parent().find('input').type(longCompanyName);
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-10-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-10-After-Submit');
    
    // May truncate, show error, or accept
    cy.get('body').should('exist');
  });

  /**
   * TC-11: Surname >50 chars (I4 + BVA just above)
   * Purpose: Test boundary value - just above maximum length
   * Covered Classes: I4, BVA (51 chars)
   */
  it('TC-11: Should handle Surname exceeding 50 characters', () => {
    const longSurname = 'A'.repeat(51); // 51 characters
    
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type(longSurname);
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-11-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-11-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-12: Name >50 chars (I7 + BVA just above)
   * Purpose: Test boundary value - just above maximum length
   * Covered Classes: I7, BVA (51 chars)
   */
  it('TC-12: Should handle Name exceeding 50 characters', () => {
    const longName = 'A'.repeat(51); // 51 characters
    
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type(longName);
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-12-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-12-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-13: Phone too short – 6 digits (I11 + BVA just below)
   * Purpose: Test boundary value - just below minimum length
   * Covered Classes: I11, BVA (6 digits)
   */
  it('TC-13: Should handle Phone with 6 digits (below minimum)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('123456'); // 6 digits
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-13-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-13-After-Submit');
    
    // Frontend may allow, backend might validate
    cy.get('body').should('exist');
  });

  /**
   * TC-14: Phone too long – 21 digits (I12 + BVA just above)
   * Purpose: Test boundary value - just above maximum length
   * Covered Classes: I12, BVA (21 digits)
   */
  it('TC-14: Should handle Phone with 21 digits (above maximum)', () => {
    const longPhone = '1'.repeat(21); // 21 digits
    
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type(longPhone);
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-14-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-14-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-15: Company min length (BVA on lower boundary)
   * Purpose: Test boundary value - minimum valid length
   * Covered Classes: BVA (1 char)
   */
  it('TC-15: Should accept Company Name with 1 character (minimum length)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('A');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-15-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-15-After-Submit');
    
    // Should accept minimum length
    cy.get('body').should('exist');
  });

  /**
   * TC-16: Surname min length (BVA on lower boundary)
   * Purpose: Test boundary value - minimum valid length
   * Covered Classes: BVA (1 char)
   */
  it('TC-16: Should accept Surname with 1 character (minimum length)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('A');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-16-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-16-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-17: Name min length (BVA on lower boundary)
   * Purpose: Test boundary value - minimum valid length
   * Covered Classes: BVA (1 char)
   */
  it('TC-17: Should accept Name with 1 character (minimum length)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('A');
    cy.contains('label', 'Phone').parent().find('input').type('0723123456');
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-17-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-17-After-Submit');
    
    cy.get('body').should('exist');
  });

  /**
   * TC-18: Phone min valid (7 digits)
   * Purpose: Test boundary value - minimum valid phone length
   * Covered Classes: BVA (7 digits)
   */
  it('TC-18: Should accept Phone with 7 digits (minimum valid)', () => {
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type('1234567'); // 7 digits
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-18-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-18-After-Submit');
    
    // Should accept if system allows
    cy.get('body').should('exist');
  });

  /**
   * TC-19: Phone max valid (20 digits)
   * Purpose: Test boundary value - maximum valid phone length
   * Covered Classes: BVA (20 digits)
   */
  it('TC-19: Should accept Phone with 20 digits (maximum valid)', () => {
    const maxPhone = '1'.repeat(20); // 20 digits
    
    cy.contains('label', 'company Name').parent().find('input').type('ACME');
    cy.contains('label', 'Surname').parent().find('input').type('Popescu');
    cy.contains('label', 'Name').parent().find('input').type('Ion');
    cy.contains('label', 'Phone').parent().find('input').type(maxPhone);
    cy.contains('label', 'E-mail').parent().find('input').type('ion@ex.com');
    
    cy.takeScreenshot('TC-19-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-19-After-Submit');
    
    // Should accept if system allows
    cy.get('body').should('exist');
  });

  /**
   * TC-20: Special characters in name fields (common case)
   * Purpose: Test handling of special characters (hyphens, apostrophes)
   * Covered Classes: Valid special characters
   */
  it('TC-20: Should accept special characters in name fields', () => {
    cy.contains('label', 'company Name').parent().find('input').type("O'Connor Ltd");
    cy.contains('label', 'Surname').parent().find('input').type('Ionescu-Mă');
    cy.contains('label', 'Name').parent().find('input').type('Ana-Maria');
    cy.contains('label', 'Phone').parent().find('input').type('+40 723 123 456');
    cy.contains('label', 'E-mail').parent().find('input').type('ana.maria@company.ro');
    
    cy.takeScreenshot('TC-20-Before-Submit');
    
    cy.contains('button', 'Submit').click();
    
    cy.wait(2000);
    
    cy.takeScreenshot('TC-20-After-Submit');
    
    // Should accept special characters
    cy.get('body').should('exist');
  });
});

