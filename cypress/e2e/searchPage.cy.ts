import { stableDomDefaultParams } from '../fixtures/constants';

describe('searchPage e2e tests', () => {
  before('User is on Search Page', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.reload();
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
  });

  describe('Verify functionality of the search button', () => {
    it('Search button disabled before ingredients selected ', () => {
      cy.findByTestId('recipe-search-button').should('be.disabled');
    });

    it('User selects ingredient, button is enabled', () => {
      cy.findByLabelText('Select Ingredients').type('Apple').type('{enter}');
      cy.findByTestId('recipe-search-button').should('be.enabled');
    });

    it('User removes all ingredients, button is disabled again', () => {
      cy.findByText('Apple').click();
      cy.findByTestId('recipe-search-button').should('be.disabled');
    });
  });

  describe('Verify functionality of ingredient list', () => {
    it('User selects multiple ingredients, they are displayed', () => {
      cy.findByLabelText('Select Ingredients').type('Apple').type('{enter}');
      cy.findByLabelText('Select Ingredients')
        .type('Taco shells')
        .type('{enter}');
      cy.findByLabelText('Select Ingredients')
        .type('Pistachios')
        .type('{enter}');

      cy.findByText('Apple').should('be.visible');
      cy.findByText('Taco shells').should('be.visible');
      cy.findByText('Pistachios').should('be.visible');
    });

    it('User tried to select the same ingredient twice', () => {
      cy.findByLabelText('Select Ingredients').type('Apple');
      cy.get('[key="Apple"]').should('not.exist');
      cy.findByTestId('select-prompt').click();
    });

    it('User removes ingredient, ingredient becomes an option again', () => {
      cy.findByText('Apple').click();
      cy.contains('body', 'Apple').should('not.exist');
    });
  });
});
