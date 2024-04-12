describe('login e2e tests', () => {
  describe('unverified user can not access app', () => {
    it('User is redirected to login ', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
    });
    it('User is redirected to login ', () => {
      cy.visit('/recipe-preview-list');
      cy.url().should('include', '/login');
    });
    it('User is redirected to login ', () => {
      cy.visit('/recipe/details');
      cy.url().should('include', '/login');
    });
  });
});
