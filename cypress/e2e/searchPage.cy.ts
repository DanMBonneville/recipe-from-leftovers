import { stableDomDefaultParams } from '../fixtures/constants';

describe('searchPage e2e tests', () => {
  const addIngredientsMessage = 'Please add ingredients before searching';

  before('User is on Search Page', () => {
    cy.visit('/');
    cy.get('body').waitForStableDOM(stableDomDefaultParams);
  });

  it('Search for no ingredients - error message', () => {
    cy.get('body').should('not.contain', addIngredientsMessage);
    cy.findByTestId('recipe-search-button').click();
    cy.findByText(addIngredientsMessage).should('be.visible');
  });

  // it('User selects multiple ingredients', () => {
  //   cy.pause();
  //   fail();
  // });

  // it('User selects multiple ingredients and deletes one', () => {
  //   cy.pause();
  //   fail();
  // });
});
