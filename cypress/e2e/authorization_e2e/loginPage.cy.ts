describe('login e2e tests', () => {
  const clearSessionGoToRoot = () => {
    cy.clearLocalStorage().then(() => {
      cy.clearAllSessionStorage().then(() => {
        cy.visit('/');
      });
    });
  };

  const attemptLoginWithCredentials = (email: string, password: string) => {
    cy.findByTestId('email-input').clear();
    if (email) cy.findByTestId('email-input').type(email);
    cy.findByTestId('password-input').clear();
    if (password) cy.findByTestId('password-input').type(password);
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

  describe('Verify login error scenarios ', () => {
    before('Clear local storage', () => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('Verify invalid email message', () => {
      attemptLoginWithCredentials('asdf', '');
      cy.findByText('Please enter a valid email address.').should('be.visible');
    });

    it('Verify invalid login credentials message', () => {
      attemptLoginWithCredentials('test@test.com', '1234567');
      cy.findByText('Incorrect email or password. Please try again.').should(
        'be.visible'
      );
    });
    it('Verify missing password message', () => {
      attemptLoginWithCredentials('test@test1', '');
      cy.pause();
      cy.findByText('Please enter a password.').should('be.visible');
    });
  });
});
