import { stableDomDefaultParams } from '../fixtures/constants';

describe('resultsPage e2e tests', () => {
  before('User is on recipe details page for bread Omlette', () => {
    cy.visit('/');
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
    cy.findByLabelText('Select Ingredients').type('milk');
    cy.findByText('Milk').click();
    cy.findByLabelText('Select Ingredients').type('eggs');
    cy.findByText('Free range eggs').click();
    cy.findByTestId('recipe-search-button').click();
    cy.findByText('Yorkshire Pudding').click();
    cy.pause();
  });

  it('Verify search button on search page nagiates use to results page', () => {
    cy.findByText('Green grapes').click();
    cy.findByTestId('recipe-search-button').click();
    cy.url().should('contains', '/searchResults');
  });
});
