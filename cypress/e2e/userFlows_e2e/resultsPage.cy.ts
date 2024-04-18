import { Interception } from 'cypress/types/net-stubbing';
import { testUser1Email, testUser1Password } from '../../fixtures/constants';

describe('resultsPage e2e tests', () => {
  before('User is on Search Page', () => {
    cy.login(testUser1Email, testUser1Password);
    cy.deselectAllIngredients();
  });

  it('Verify search button on search page navigates use to results page', () => {
    cy.findByLabelText('Select Ingredients')
      .type('Green grapes')
      .type('{enter}');
    cy.findByLabelText('Select Ingredients').type('Apple').type('{enter}');
    cy.findByTestId('recipe-search-button').click();
    cy.url().should('contains', '/recipe-preview-list');
  });

  it('User sends correct ingredient list on submit', () => {
    cy.findByTestId('back-page-btn').click();
    cy.intercept('GET', '**get-recipes-from-ingredients**').as('GetRecipes');
    cy.findByTestId('recipe-search-button').click();
    cy.wait('@GetRecipes').then((res: Interception) => {
      const ingredientArray = (res.request.query.ingredients + '').split(',');
      expect(ingredientArray.length).to.be.equal(2);
      expect(ingredientArray).to.include('green grapes');
      expect(ingredientArray).to.include('apple');
    });
  });
});
