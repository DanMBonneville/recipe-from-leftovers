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

Cypress.Commands.add('deleteUserByUid', (uid: string) => {
  console.log('Deleting user... ', uid);
  return cy.wrap(axios.post('/api/fire/delete-user', { uid }));
});

declare global {
  namespace Cypress {
    interface Chainable {
      clearSessionGoToRoot(): Chainable<void>;
      deleteUserByUid(uid: string): Chainable<AxiosResponse<any>>;
    }
  }
}
