import { stableDomDefaultParams } from '../fixtures/constants';

describe('resultsPage e2e tests', () => {
  before('User is on Search Page', () => {
    cy.visit('/');
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
  });

  it('Verify search button on search page nagiates use to results page', () => {
    cy.findByLabelText('Select Ingredients').type('grapes');
    cy.findByText('Grapes').click();
    cy.findByTestId('recipe-search-button').click();
    cy.url().should('contains', '/searchResults');
  });
});
