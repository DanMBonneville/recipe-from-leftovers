import { render, screen } from '@testing-library/react';
import RecipeSearchButton from '../../components/SearchPageComponents/SelectSubmitIngredients/RecipeSearchButton';

describe('<RecipeSearchButton />', () => {
  it('Verify function in props is called once on click', () => {
    const handleSearchForRecipes = jest.fn();
    render(
      <RecipeSearchButton
        isButtonDisabled={false}
        handleSearchForRecipes={handleSearchForRecipes}
      />
    );
    screen.getByTestId('recipe-search-button').click();
    expect(handleSearchForRecipes).toHaveBeenCalledTimes(1);
  });
});
