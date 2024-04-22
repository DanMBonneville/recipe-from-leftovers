/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
import axios, { AxiosResponse } from 'axios';
import { registerCommand } from 'cypress-wait-for-stable-dom';
import { stableDomDefaultParams } from '../fixtures/constants';
registerCommand();

Cypress.Commands.add('clearSessionGoToRoot', () => {
  cy.clearLocalStorage().then(() => {
    cy.clearAllSessionStorage().then(() => {
      cy.visit('/');
    });
  });
});

Cypress.Commands.add('waitForStableDom', () => {
  cy.waitForStableDOM(stableDomDefaultParams);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.waitForStableDOM();
  cy.clearSessionGoToRoot();
  cy.findByTestId('login-email-input').clear();
  cy.findByTestId('login-password-input').clear();
  if (email) cy.findByTestId('login-email-input').type(email);
  if (password) cy.findByTestId('login-password-input').type(password);
  cy.findByTestId('login-button').click();
  cy.waitForStableDOM(stableDomDefaultParams);
});

Cypress.Commands.add('selectIngredient', (ingredient: string) => {
  cy.findByLabelText('Select Ingredients')
    .clear()
    .type(ingredient)
    .type('{enter}');
});

Cypress.Commands.add('deselectIngredient', (ingredient: string) => {
  cy.contains(ingredient).click();
});

Cypress.Commands.add('deselectAllIngredients', () => {
  cy.get('body')
    .find('span')
    .then(($elements) => {
      const elementsWithClear = $elements.filter((index, el) => {
        if (el && el.textContent) {
          return el.textContent.includes('clear');
        }
        return false;
      });
      if (elementsWithClear.length > 0) {
        cy.wrap(elementsWithClear).each(($el) => {
          cy.wrap($el).click();
        });
      }
    });
  cy.findByTestId('select-prompt').click();
});

Cypress.Commands.add('deleteUserByUid', (uid: string) => {
  return cy.wrap(axios.post('/api/fire/delete-user', { uid }));
});

declare global {
  namespace Cypress {
    interface Chainable {
      clearSessionGoToRoot(): Chainable<void>;
      waitForStableDom(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      selectIngredient(ingredient: string): Chainable<void>;
      deselectIngredient(ingredient: string): Chainable<void>;
      deselectAllIngredients(): Chainable<void>;
      deleteUserByUid(uid: string): Chainable<AxiosResponse<any>>;
    }
  }
}
