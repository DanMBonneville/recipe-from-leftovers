import {
  testUser1Email,
  testUser1Password,
  testUser2Email,
  testUser2Password,
} from '../../fixtures/constants';

describe('searchPage e2e tests', () => {
  describe('Verify functionality of the search button', () => {
    before(() => {
      cy.login(testUser1Email, testUser2Password);
      cy.deselectAllIngredients();
    });

    it('Search button disabled before ingredients selected ', () => {
      cy.findByTestId('recipe-search-button').should('be.disabled');
    });

    it('User selects ingredient, button is enabled', () => {
      cy.selectIngredient('Apple');
      cy.findByTestId('recipe-search-button').should('be.enabled');
    });

    it('User removes all ingredients, button is disabled again', () => {
      cy.findByTestId('select-prompt').click();
      cy.deselectIngredient('Apple');
      cy.findByTestId('recipe-search-button').should('be.disabled');
    });
  });

  describe('Verify functionality of ingredient list', () => {
    before(() => {
      cy.login(testUser1Email, testUser2Password);
      cy.deselectAllIngredients();
    });

    it('User selects multiple ingredients, they are displayed', () => {
      cy.selectIngredient('Apple');
      cy.selectIngredient('Taco shells');
      cy.selectIngredient('Pistachios');
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
      cy.deselectIngredient('Apple');
      cy.contains('body', 'Apple').should('not.exist');
    });
  });

  describe('Verify functionality of save and restore selection', () => {
    before(() => {
      cy.login(testUser1Email, testUser2Password);
      cy.deselectAllIngredients().then(() => {
        cy.intercept('POST', '**save-default-selected-ingredients').as(
          'SaveIngredients'
        );
        cy.findByText('Save Selection').click();
        cy.wait('@SaveIngredients');
        cy.selectIngredient('Apple');
        cy.selectIngredient('Taco shells');
        cy.selectIngredient('Pistachios');
      });
    });

    it('Verify selection button works', () => {
      cy.findByTestId('select-prompt').click();
      cy.intercept('POST', '**save-default-selected-ingredients').as(
        'SaveIngredients'
      );
      cy.findByText('Save Selection').click();
      cy.wait('@SaveIngredients');
      cy.deselectIngredient('Apple');
      cy.deselectIngredient('Taco shells');
      cy.deselectIngredient('Pistachios');

      cy.findByText('Restore Selection').click();
      cy.findByText('Apple').should('be.visible');
      cy.findByText('Taco shells').should('be.visible');
      cy.findByText('Pistachios').should('be.visible');
    });

    after(() => {
      cy.deselectAllIngredients().then(() => {
        cy.findByText('Save Selection').click();
      });
    });
  });

  describe('Verify functionality of save and restore selection multiple users', () => {
    before(() => {
      cy.login(testUser1Email, testUser1Password);
      cy.findByTestId('select-prompt').should('be.visible');
      cy.deselectAllIngredients();
      cy.selectIngredient('Apple');
      cy.selectIngredient('Taco shells');
      cy.selectIngredient('Pistachios');
      cy.intercept('POST', '**save-default-selected-ingredients').as(
        'SaveIngredients'
      );
      cy.findByText('Save Selection').click();
      cy.wait('@SaveIngredients');
      cy.findByText('Logout').click();
      cy.login(testUser2Email, testUser2Password);
    });

    it('Verify second user does not have default selection of the first user', () => {
      cy.get('[key="Apple"]').should('not.exist');
    });

    it('Verify saving selection for second user', () => {
      cy.selectIngredient('Beef');
      cy.intercept('POST', '**save-default-selected-ingredients').as(
        'SaveIngredients'
      );
      cy.findByText('Save Selection').click();
      cy.wait('@SaveIngredients');
      cy.deselectAllIngredients();
      cy.findByText('Restore Selection').click();
      cy.findByText('Beef').should('be.visible');
      cy.findByText('Logout').click();
    });

    it('Verify first user maintins default selection', () => {
      cy.login(testUser1Email, testUser1Password);
      cy.findByTestId('select-prompt').should('be.visible');
      cy.findByText('Apple').should('be.visible');
      cy.findByText('Taco shells').should('be.visible');
      cy.findByText('Pistachios').should('be.visible');
    });

    after(() => {
      cy.login(testUser1Email, testUser1Password);
      cy.deselectAllIngredients();
      cy.intercept('POST', '**save-default-selected-ingredients').as(
        'SaveIngredients'
      );
      cy.findByText('Save Selection').click();
      cy.wait('@SaveIngredients');
      cy.login(testUser2Email, testUser2Password);
      cy.deselectAllIngredients();
      cy.intercept('POST', '**save-default-selected-ingredients').as(
        'SaveIngredients'
      );
      cy.findByText('Save Selection').click();
      cy.wait('@SaveIngredients');
    });
  });
});
