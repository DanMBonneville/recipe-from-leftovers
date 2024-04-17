/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
import axios, { AxiosResponse } from 'axios';
import { registerCommand } from 'cypress-wait-for-stable-dom';
registerCommand();

Cypress.Commands.add('clearSessionGoToRoot', () => {
  cy.clearLocalStorage().then(() => {
    cy.clearAllSessionStorage().then(() => {
      cy.visit('/');
    });
  });
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.clearSessionGoToRoot();
  cy.findByTestId('login-email-input').clear();
  cy.findByTestId('login-password-input').clear();
  if (email) cy.findByTestId('login-email-input').type(email);
  if (password) cy.findByTestId('login-password-input').type(password);
  cy.findByTestId('login-button').click();
});

Cypress.Commands.add('deleteUserByUid', (uid: string) => {
  return cy.wrap(axios.post('/api/fire/delete-user', { uid }));
});

declare global {
  namespace Cypress {
    interface Chainable {
      clearSessionGoToRoot(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      deleteUserByUid(uid: string): Chainable<AxiosResponse<any>>;
    }
  }
}
