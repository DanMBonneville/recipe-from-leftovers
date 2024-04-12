describe('login e2e tests', () => {
  describe('unverified user can not access app', () => {
    before('Clear local storage', () => {
      cy.clearLocalStorage();
    });

    it('User is redirected to login', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
      cy.visit('/recipe-preview-list');
      cy.url().should('include', '/login');
      cy.visit('/recipe/details');
      cy.url().should('include', '/login');
    });

    it('Displays login error if user is not found', () => {
      // cy.visit('/');
    });

    it.only('redirects to search page after successful logg in', () => {
      cy.visit('/');
      cy.findByTestId('email-input').type('test@test.com');
      cy.findByTestId('password-input').type('123456');
      cy.findByTestId('login-button').click();
    });
  });
});
