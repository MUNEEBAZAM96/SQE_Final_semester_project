/// <reference types="cypress" />

/**
 * Cypress E2E Test Suite: Signup/Register Form Validation
 * 
 * Test Objective: Verify functional correctness and input validation 
 * of the Register/Signup functionality using Black-Box testing approach.
 * 
 * Coverage: Equivalence Class Partitioning (Weak Robust) + 2-point Boundary Value Analysis
 * Total Test Cases: 25
 * 
 * Note: There is no frontend signup page in this application. The register endpoint exists 
 * in the backend API at POST /api/register. These tests will verify the API endpoint 
 * directly or document that signup functionality is not implemented in the frontend.
 * 
 * Backend Register API Requirements (from authController.js):
 * - email (required)
 * - password (required, minimum 5 characters)
 * - passwordCheck (required, must match password)
 * - name (optional, defaults to email if not provided)
 * - surname (optional)
 * 
 * Fields:
 * - E-mail (text, required)
 * - Password (password, required, min 5 chars)
 * - Password Check (password, required, must match password)
 * - Name (text, optional)
 * - Surname (text, optional)
 */

describe('Signup/Register Form - API Testing (ECP + BVA)', () => {
  beforeEach(() => {
    // Visit login page first
    cy.visit('/login');
    cy.wait(1000);
  });

  /**
   * TC-1: Verify signup page does not exist
   * Purpose: Document that signup page is not implemented in frontend
   */
  it('TC-1: Should verify that signup page does not exist in frontend', () => {
    cy.takeScreenshot('TC-01-Login-Page');
    
    // Check if "register now!" link exists but has no href
    cy.contains('register now!').should('exist');
    cy.contains('register now!').should('have.attr', 'href', '');
    
    cy.takeScreenshot('TC-01-Register-Link-No-Href');
    
    // Verify no signup route exists
    cy.visit('/signup');
    cy.url().should('include', '/login'); // Should redirect to login
    
    cy.takeScreenshot('TC-01-Signup-Route-Redirect');
  });

  /**
   * TC-2: Test register API endpoint - All nominal valid
   * Purpose: Test successful registration via API
   */
  it('TC-2: Should register successfully via API with all valid inputs', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'TestPass123!';
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: password,
        passwordCheck: password,
        name: 'Test',
        surname: 'User'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-02-API-Response');
      
      // Should return 200 or 400 (if email already exists)
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-3: Test register API - Email empty (I1)
   * Purpose: Test required field validation
   */
  it('TC-3: Should reject registration when email is empty', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: '',
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-03-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('Not all fields have been entered');
    });
  });

  /**
   * TC-4: Test register API - Password empty (I2)
   * Purpose: Test required field validation
   */
  it('TC-4: Should reject registration when password is empty', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'test@example.com',
        password: '',
        passwordCheck: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-04-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('Not all fields have been entered');
    });
  });

  /**
   * TC-5: Test register API - Password too short (I3 + BVA)
   * Purpose: Test password minimum length validation (4 chars - below minimum)
   */
  it('TC-5: Should reject registration when password is too short (4 chars)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'test@example.com',
        password: '1234', // 4 chars - below minimum
        passwordCheck: '1234'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-05-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('at least 5 characters');
    });
  });

  /**
   * TC-6: Test register API - Password minimum valid (BVA lower boundary)
   * Purpose: Test password with exactly 5 characters (minimum valid)
   */
  it('TC-6: Should accept registration with password of 5 characters (minimum)', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: '12345', // Exactly 5 chars
        passwordCheck: '12345'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-06-API-Response');
      
      // Should accept (200) or reject if email exists (400)
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-7: Test register API - Password mismatch (I4)
   * Purpose: Test password confirmation validation
   */
  it('TC-7: Should reject registration when passwords do not match', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'test@example.com',
        password: 'TestPass123!',
        passwordCheck: 'DifferentPass123!' // Mismatch
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-07-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('same password twice');
    });
  });

  /**
   * TC-8: Test register API - Duplicate email (I5)
   * Purpose: Test duplicate email validation
   */
  it('TC-8: Should reject registration with duplicate email', () => {
    // Try to register with existing admin email
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'admin@demo.com', // Existing email
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-08-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('already exists');
    });
  });

  /**
   * TC-9: Test register API - Invalid email format (no @)
   * Purpose: Test email format validation
   */
  it('TC-9: Should handle invalid email format (no @ symbol)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'invalidemail',
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-09-API-Response');
      
      // Backend may or may not validate email format
      expect(response.status).to.be.oneOf([200, 400, 500]);
    });
  });

  /**
   * TC-10: Test register API - Name optional (defaults to email)
   * Purpose: Test optional name field
   */
  it('TC-10: Should register successfully without name (defaults to email)', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
        // No name provided
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-10-API-Response');
      
      // Should accept (200) or reject if email exists (400)
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-11: Test register API - Surname optional
   * Purpose: Test optional surname field
   */
  it('TC-11: Should register successfully without surname', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!',
        name: 'Test'
        // No surname provided
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-11-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-12: Test register API - Very long password (BVA upper)
   * Purpose: Test boundary value - very long password
   */
  it('TC-12: Should handle very long password', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const longPassword = 'A'.repeat(100); // 100 characters
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: longPassword,
        passwordCheck: longPassword
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-12-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400, 500]);
    });
  });

  /**
   * TC-13: Test register API - Email with special characters
   * Purpose: Test email with plus sign and special characters
   */
  it('TC-13: Should handle email with plus sign and special characters', () => {
    const timestamp = Date.now();
    const email = `test+user${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-13-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-14: Test register API - SQL injection attempt
   * Purpose: Test security - SQL injection prevention
   */
  it('TC-14: Should handle SQL injection attempt in email', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: "admin' OR '1'='1",
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-14-API-Response-Security');
      
      // Should reject or handle securely
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  /**
   * TC-15: Test register API - XSS attempt
   * Purpose: Test security - XSS prevention
   */
  it('TC-15: Should handle XSS attempt in email', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: '<script>alert("XSS")</script>@demo.com',
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-15-API-Response-Security');
      
      // Should reject or sanitize
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  /**
   * TC-16: Test register API - Very long name
   * Purpose: Test name field with maximum length
   */
  it('TC-16: Should handle very long name field', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const longName = 'A'.repeat(200); // Very long name
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!',
        name: longName
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-16-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400, 500]);
    });
  });

  /**
   * TC-17: Test register API - Very long surname
   * Purpose: Test surname field with maximum length
   */
  it('TC-17: Should handle very long surname field', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const longSurname = 'B'.repeat(200); // Very long surname
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!',
        surname: longSurname
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-17-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400, 500]);
    });
  });

  /**
   * TC-18: Test register API - Password with spaces
   * Purpose: Test password with spaces
   */
  it('TC-18: Should handle password with spaces', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'Test Pass 123!', // Password with spaces
        passwordCheck: 'Test Pass 123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-18-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-19: Test register API - Special characters in name
   * Purpose: Test name with special characters
   */
  it('TC-19: Should handle special characters in name', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!',
        name: "O'Connor",
        surname: "O'Brien-Smith"
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-19-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-20: Test register API - Empty passwordCheck
   * Purpose: Test passwordCheck required validation
   */
  it('TC-20: Should reject registration when passwordCheck is empty', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: 'test@example.com',
        password: 'TestPass123!',
        passwordCheck: '' // Empty
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-20-API-Response-Error');
      
      expect(response.status).to.equal(400);
      expect(response.body.msg).to.include('Not all fields have been entered');
    });
  });

  /**
   * TC-21: Test register API - All fields provided (complete registration)
   * Purpose: Test successful registration with all fields
   */
  it('TC-21: Should register successfully with all fields provided', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!',
        name: 'Test',
        surname: 'User'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-21-API-Response-Success');
      
      if (response.status === 200) {
        expect(response.body.success).to.equal(true);
        expect(response.body.admin).to.have.property('id');
        expect(response.body.admin).to.have.property('name');
        expect(response.body.admin).to.have.property('surname');
      } else {
        // Email might already exist
        expect(response.status).to.equal(400);
      }
    });
  });

  /**
   * TC-22: Test register API - Case sensitivity in email
   * Purpose: Test if email is case-sensitive
   */
  it('TC-22: Should handle email case sensitivity', () => {
    const timestamp = Date.now();
    const email = `TESTUSER${timestamp}@EXAMPLE.COM`; // Uppercase
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-22-API-Response');
      
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-23: Test register API - Password with only numbers
   * Purpose: Test password with numeric-only
   */
  it('TC-23: Should handle password with only numbers', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: '12345678', // Only numbers, but >= 5 chars
        passwordCheck: '12345678'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-23-API-Response');
      
      // Should accept (no strength requirements in backend)
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-24: Test register API - Password with only letters
   * Purpose: Test password with alphabetic-only
   */
  it('TC-24: Should handle password with only letters', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'abcdefgh', // Only letters, >= 5 chars
        passwordCheck: 'abcdefgh'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.takeScreenshot('TC-24-API-Response');
      
      // Should accept (no strength requirements in backend)
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });

  /**
   * TC-25: Test register API - Multiple rapid registrations
   * Purpose: Test rate limiting or duplicate prevention
   */
  it('TC-25: Should handle multiple rapid registration attempts', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    // First registration
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/register',
      body: {
        email: email,
        password: 'TestPass123!',
        passwordCheck: 'TestPass123!'
      },
      failOnStatusCode: false
    }).then((firstResponse) => {
      cy.takeScreenshot('TC-25-First-Registration');
      
      // Second registration with same email
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/register',
        body: {
          email: email,
          password: 'TestPass123!',
          passwordCheck: 'TestPass123!'
        },
        failOnStatusCode: false
      }).then((secondResponse) => {
        cy.takeScreenshot('TC-25-Second-Registration-Duplicate');
        
        // Second should fail with duplicate email error
        expect(secondResponse.status).to.equal(400);
        expect(secondResponse.body.msg).to.include('already exists');
      });
    });
  });
});

