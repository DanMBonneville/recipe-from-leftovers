import { Interception } from 'cypress/types/net-stubbing';
import { stableDomDefaultParams } from '../fixtures/constants';

describe('resultsPage e2e tests', () => {
  before('User is on Search Page', () => {
    cy.visit('/');
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
  });

  it('Verify search button on search page navigates use to results page', () => {
    cy.findByLabelText('Select Ingredients')
      .type('Green grapes')
      .type('{enter}');
    cy.findByLabelText('Select Ingredients').type('Apple').type('{enter}');
    cy.findByTestId('recipe-search-button').click();
    cy.url().should('contains', '/searchResults');
  });

  it('User sends correct ingredient list on submit', () => {
    cy.findByTestId('back-page-btn').click();
    cy.intercept('GET', '**getRecipesFromIngredients**').as('GetRecipes');
    cy.findByTestId('recipe-search-button').click();
    cy.wait('@GetRecipes').then((res: Interception) => {
      const ingredientArray = (res.request.query.ingredients + '').split(',');
      expect(ingredientArray.length).to.be.equal(2);
      expect(ingredientArray).to.include('green grapes');
      expect(ingredientArray).to.include('apple');
    });
  });
});
