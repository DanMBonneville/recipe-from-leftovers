describe('sign up e2e tests', () => {
  describe('unverified user can not access app', () => {
    it('User is redirected to login', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
      cy.findByText('Sign Up').click();
    });

    it('Displays password error', () => {
      // cy.visit('/');
    });

    it('redirects to search page when logged in', () => {
      // cy.visit('/');
    });
  });
});
