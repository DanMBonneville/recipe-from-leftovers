describe('login e2e tests', () => {
  const clearSessionGoToRoot = () => {
    cy.clearLocalStorage().then(() => {
      cy.clearAllSessionStorage().then(() => {
        cy.visit('/');
      });
    });
  };

  const attemptLoginWithCredentials = (email: string, password: string) => {
    cy.findByTestId('login-email-input').clear();
    if (email) cy.findByTestId('login-email-input').type(email);
    cy.findByTestId('login-password-input').clear();
    if (password) cy.findByTestId('login-password-input').type(password);
    cy.findByTestId('login-button').click();
  };

  describe('happy path', () => {
    before('Clear local storage', () => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('redirects to search page after successful log in', () => {
      attemptLoginWithCredentials('test@test.com', '123456');
      cy.url().should('include', '/search-for-recipes');
      cy.findByTestId('select-prompt').should('be.visible');
    });
  });

  describe('unverified user can not access app', () => {
    before('Clear local storage', () => {
      clearSessionGoToRoot();
    });

    it('User is redirected to login', () => {
      cy.url().should('include', '/login');
      cy.visit('/recipe-preview-list');
      cy.url().should('include', '/login');
      cy.visit('/recipe/details');
      cy.url().should('include', '/login');
    });
  });

  describe.only('Verify login error scenarios ', () => {
    before('Clear local storage', () => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('Verify invalid email message', () => {
      attemptLoginWithCredentials('asdf', '');
      cy.findByText('Please enter a valid email address.').should('be.visible');
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('not.exist');
    });

    it('Verify invalid login credentials message', () => {
      attemptLoginWithCredentials('test@test.com', '1234567');
      cy.findByText('Incorrect email or password. Please try again.').should(
        'be.visible'
      );
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('be.visible');
    });
    it('Verify missing password message', () => {
      attemptLoginWithCredentials('test@test', '');
      cy.findByText('Please enter a password.').should('be.visible');
      cy.get('.email-input-error').should('not.exist');
      cy.get('.password-input-error').should('be.visible');
    });
  });
});
