describe('Auth', () => {
  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('shows signup form', () => {
      cy.get('h1').should('contain', 'SignUp');
      cy.get('#firstName').should('exist');
      cy.get('#lastName').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('button').should('contain', 'Submit');
    });

    it('shows error when fields are empty', () => {
      cy.get('button').click();
      cy.get('ul').should('contain', 'Please fill in');
    });

    it('shows error when email already exists', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/signup', {
        statusCode: 400,
        body: { messages: ['We already have a user with that e-mail.'] },
      }).as('signupRequest');

      cy.fixture('user').then((user) => {
        cy.get('#firstName').type(user.existingUser.firstName);
        cy.get('#lastName').type(user.existingUser.lastName);
        cy.get('#email').type(user.existingUser.email);
        cy.get('#password').type(user.existingUser.password);
        cy.get('button').click();
        cy.get('ul').should('contain', 'already have a user');
      });
    });

    it('shows password validation errors', () => {
      cy.fixture('user').then((user) => {
        cy.get('#firstName').type('Test');
        cy.get('#lastName').type('User');
        cy.get('#email').type('faa@boo.com');
        cy.get('#password').type('123');
        cy.get('button').click();
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
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('button').should('contain', 'Submit');
    });

    it('shows error when fields are empty', () => {
      cy.get('button').click();
      cy.get('ul').should('contain', 'Please fill in');
    });

    it('shows error with wrong password', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        statusCode: 400,
        body: { messages: ['Invalid email or password'] },
      }).as('loginRequest');

      cy.fixture('user').then((user) => {
        cy.get('#email').type(user.existingUser.email);
        cy.get('#password').type('wrongpassword');
        cy.get('button').click();
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
        cy.get('#email').type('sara2@test.com');
        cy.get('#password').type(user.existingUser.password);
        cy.get('button').click();
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
        cy.get('#email').type(user.existingUser.email);
        cy.get('#password').type(user.existingUser.password);
        cy.get('button').click();
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
