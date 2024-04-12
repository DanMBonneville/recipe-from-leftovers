import { stableDomDefaultParams } from '../../fixtures/constants';

describe('resultsPage e2e tests', () => {
  describe('Verify that a regular use case where the user has some of the ingrededients on the final page', () => {
    before('User is on recipe details page for Bread Omlette', () => {
      cy.clearLocalStorage();
      cy.visit('/');
      cy.reload();
      cy.get('body').waitForStableDOM(stableDomDefaultParams);
      cy.findByLabelText('Select Ingredients').type('milk');
      cy.findByText('Milk').click();
      cy.findByLabelText('Select Ingredients').type('eggs');
      cy.findByText('Free range eggs').click();
      cy.findByTestId('recipe-search-button').click();
      cy.findByText('Yorkshire Pudding').click();
    });

    it('Verify what you have block is preset', () => {
      cy.findByText('What you have').should('be.visible');
    });

    it('Verify what you need block is preset', () => {
      cy.findByText('What you need').should('be.visible');
    });
  });

  describe('Verify the use case for when the user has all the ingredients', () => {
    before('User is on recipe details page for bread Omlette', () => {
      cy.clearLocalStorage();
      cy.visit('/');
      cy.reload();
      cy.get('body').waitForStableDOM(stableDomDefaultParams);
      cy.findByLabelText('Select Ingredients').type('milk');
      cy.findByText('Milk').click();
      cy.findByLabelText('Select Ingredients').type('eggs');
      cy.findByText('Free range eggs').click();
      cy.findByLabelText('Select Ingredients').type('vanilla');
      cy.findByText('Vanilla').click();
      cy.findByTestId('recipe-search-button').click();
      cy.findByText('Baked Custard').click();
    });

    it('Verify what you have block is preset', () => {
      cy.findByText('What you have').should('be.visible');
    });

    it('Verify what you need block is preset', () => {
      cy.get('div').contains('What you need').should('not.exist');
    });
  });
});
