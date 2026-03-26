describe('Auth', () => {
  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('shows signup form', () => {
      cy.get('h1').should('contain', 'SignUp');
      cy.get('[data-cy="firstName-input"]').should('exist');
      cy.get('[data-cy="lastName-input"]').should('exist');
      cy.get('[data-cy="email-input"]').should('exist');
      cy.get('[data-cy="password-input"]').should('exist');
      cy.get('[data-cy="submit-button"]').should('contain', 'Submit');
    });

    it('shows error when fields are empty', () => {
      cy.get('[data-cy="submit-button"]').click();
      cy.get('ul').should('contain', 'Please fill in');
    });

    it('shows error when email already exists', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/signup', {
        statusCode: 400,
        body: { messages: ['We already have a user with that e-mail.'] },
      }).as('signupRequest');

      cy.fixture('user').then((user) => {
        cy.get('[data-cy="firstName-input"]').type(user.existingUser.firstName);
        cy.get('[data-cy="lastName-input"]').type(user.existingUser.lastName);
        cy.get('[data-cy="email-input"]').type(user.existingUser.email);
        cy.get('[data-cy="password-input"]').type(user.existingUser.password);
        cy.get('[data-cy="submit-button"]').click();
        cy.get('ul').should('contain', 'already have a user');
      });
    });

    it('shows password validation errors', () => {
      cy.fixture('user').then((user) => {
        cy.get('[data-cy="firstName-input"]').type('Test');
        cy.get('[data-cy="lastName-input"]').type('User');
        cy.get('[data-cy="email-input"]').type('faa@boo.com');
        cy.get('[data-cy="password-input"]').type('123');
        cy.get('[data-cy="submit-button"]').click();
        cy.get('li').should(
          'contain',
          'Password must be at least 8 characters',
        );
        cy.get('li').should(
          'contain',
          'Password must have at least one uppercase letter',
        );
      });
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Shows login form', () => {
      cy.get('h1').should('contain', 'LogIn');
      cy.get('[data-cy="email-input"]').should('exist');
      cy.get('[data-cy="password-input"]').should('exist');
      cy.get('[data-cy="submit-button"]').should('contain', 'Submit');
    });

    it('shows error when fields are empty', () => {
      cy.get('[data-cy="submit-button"]').click();
      cy.get('ul').should('contain', 'Please fill in');
    });

    it('shows error with wrong password', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        statusCode: 400,
        body: { messages: ['Invalid email or password'] },
      }).as('loginRequest');

      cy.fixture('user').then((user) => {
        cy.get('[data-cy="email-input"]').type(user.existingUser.email);
        cy.get('[data-cy="password-input"]').type('wrongpassword');
        cy.get('[data-cy="submit-button"]').click();
        cy.wait('@loginRequest');
        cy.get('ul').should('contain', 'Invalid email or password');
      });
    });

    it('shows error when email does not exist', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        statusCode: 400,
        body: { messages: ['Invalid email or password'] },
      }).as('loginRequest');

      cy.fixture('user').then((user) => {
        cy.get('[data-cy="email-input"]').type('sara2@test.com');
        cy.get('[data-cy="password-input"]').type(user.existingUser.password);
        cy.get('[data-cy="submit-button"]').click();
        cy.wait('@loginRequest');
        cy.get('ul').should('contain', 'Invalid email or password');
      });
    });

    it('redirects to dashboard after successful login', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token' },
      }).as('loginRequest');

      cy.intercept('GET', 'http://localhost:5000/auth/verify', {
        statusCode: 200,
        body: {
          user: { _id: '123', firstName: 'Sara', email: 'sara@test.com' },
        },
      }).as('verifyRequest');

      cy.fixture('user').then((user) => {
        cy.get('[data-cy="email-input"]').type(user.existingUser.email);
        cy.get('[data-cy="password-input"]').type(user.existingUser.password);
        cy.get('[data-cy="submit-button"]').click();
        cy.wait('@loginRequest');
        cy.url().should('include', '/dashboard');
      });
    });
  });

  describe('Protected Route', () => {
    it('redirects to login when not authenticated', () => {
      cy.clearLocalStorage();
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });
  });
});
