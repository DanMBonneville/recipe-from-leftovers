import { Interception } from 'cypress/types/net-stubbing';
import { stableDomDefaultParams } from '../fixtures/constants';

describe('searchPage e2e tests', () => {
  before('User is on Search Page', () => {
    cy.visit('/');
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
  });

  it('Search button disabled before ingredients selected ', () => {
    cy.findByTestId('recipe-search-button').should('be.disabled');
  });

  it('User selects multiple ingredients, they are displayed', () => {
    cy.findByLabelText('Select Ingredients').type('Apple').type('{enter}');
    cy.findByLabelText('Select Ingredients')
      .type('Taco shells')
      .type('{enter}');
    cy.findByLabelText('Select Ingredients').type('Pistachios').type('{enter}');
  });

  it('User successfully deletes one ingredient', () => {
    cy.findByText('Taco shells').click();
    cy.get('body').should('not.contain', 'Taco shells');
  });

  it('User sends correct ingredient list on submit', () => {
    cy.intercept('GET', '**getRecipesFromIngredients**').as('GetRecipes');
    cy.findByTestId('recipe-search-button').click();
    cy.wait('@GetRecipes').then((res: Interception) => {
      const ingredientArray = (res.request.query.ingredients + '').split(',');
      expect(ingredientArray.length).to.be.equal(2);
      expect(ingredientArray).to.include('apple');
      expect(ingredientArray).to.include('pistachios');
    });
  });
});
