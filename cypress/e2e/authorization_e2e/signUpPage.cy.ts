import { Interception } from 'cypress/types/net-stubbing';
import { testSignUpPassword, testSignUpUser } from '../../fixtures/constants';

describe('sign up e2e tests', () => {
  describe('Verify error scenarios', () => {
    const attemptSignUpWithCredentials = (email: string, password: string) => {
      cy.findByTestId('sign-up-email-input').clear();
      cy.findByTestId('sign-up-password-input').clear();
      if (email) cy.findByTestId('sign-up-email-input').type(email);
      if (password) cy.findByTestId('sign-up-password-input').type(password);
      cy.findByTestId('sign-up-button').click();
    };

    before('Clear session go to root', () => {
      cy.clearSessionGoToRoot();
      cy.findByText('Sign Up').click();
    });

    it('Verify invalid email', () => {
      attemptSignUpWithCredentials('', '');
      cy.findByText('The email address is improperly formatted.').should(
        'be.visible'
      );
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('not.exist');
    });

    it('Verify invalid password', () => {
      attemptSignUpWithCredentials('test@test.com', '');
      cy.findByText(
        'The password must be a string with at least 6 characters.'
      ).should('be.visible');
      cy.get('.email-input-error').should('not.exist');
      cy.get('.password-input-error').should('be.visible');
    });

    it('Verify user already exists', () => {
      attemptSignUpWithCredentials('test@test.com', '123987');
      cy.findByText(
        'The email address is already in use by another account.'
      ).should('be.visible');
      cy.get('.email-input-error').should('be.visible');
      cy.get('.password-input-error').should('not.exist');
    });
  });

  describe('Verify sign up happy path', () => {
    let newUserUid: string;

    const attemptSignUpWithCredentials = (email: string, password: string) => {
      cy.findByTestId('sign-up-email-input').clear();
      cy.findByTestId('sign-up-password-input').clear();
      if (email) cy.findByTestId('sign-up-email-input').type(email);
      if (password) cy.findByTestId('sign-up-password-input').type(password);
      cy.intercept('POST', '**create-user').as('CreateUser');
      cy.findByTestId('sign-up-button').click();
      cy.wait('@CreateUser').then((res: Interception) => {
        newUserUid = res.response?.body.uid;
      });
    };

    before('Clear session go to root', () => {
      cy.clearSessionGoToRoot();
      cy.findByText('Sign Up').click();
      attemptSignUpWithCredentials(testSignUpUser, testSignUpPassword);
    });

    it('User is redirected to page as new user', () => {
      cy.findAllByTestId('select-prompt').should('be.visible');
    });

    after(() => {
      cy.deleteUserByUid(newUserUid);
      cy.findByText('Logout').click();
    });
  });
});
