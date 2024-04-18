import {
  loginUri,
  recepeDetailsPageUri,
  searchPageUri,
  searchresultsPageUri,
  testUser1Email,
  testUser2Password,
} from '../../fixtures/constants';

describe('login e2e tests', () => {
  describe('happy path', () => {
    before('Clear session go to root', () => {
      cy.clearSessionGoToRoot();
    });

    it('redirects to search page after successful log in', () => {
      cy.login(testUser1Email, testUser2Password);
      cy.url().should('include', searchPageUri);
      cy.findByTestId('select-prompt').should('be.visible');
    });
  });

  describe('unverified user can not access app', () => {
    before('Clear session go to root', () => {
      cy.clearSessionGoToRoot();
    });

    it('User is redirected to login', () => {
      cy.url().should('include', loginUri);
      cy.visit(searchresultsPageUri);
      cy.url().should('include', loginUri);
      cy.visit(recepeDetailsPageUri);
      cy.url().should('include', loginUri);
    });
  });

  describe('Verify login error scenarios ', () => {
    before('Clear session go to root', () => {
      cy.clearSessionGoToRoot();
    });

    it('Verify invalid email message', () => {
      cy.login('asdf', '');
      cy.findByText('Please enter a valid email address.').should('be.visible');
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('not.exist');
    });

    it('Verify invalid login credentials message', () => {
      cy.login(testUser1Email, '1234567');
      cy.findByText('Incorrect email or password. Please try again.').should(
        'be.visible'
      );
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('be.visible');
    });
    it('Verify missing password message', () => {
      cy.login('test@test', '');
      cy.findByText('Please enter a password.').should('be.visible');
      cy.get('.email-input-error').should('not.exist');
      cy.get('.password-input-error').should('be.visible');
    });
  });
});
