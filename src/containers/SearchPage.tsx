import { useState } from 'react';
import MultiSelectBar, { ingredientType } from '../components/MultiSelectBar';
import RecipeSearchButton from '../components/RecipeSearchButton';
import { setIngredients } from '../store/reducers/ingredientReducer';
import { useDispatch } from 'react-redux';
import { AppState, store } from '../store';
import { getRecipes } from '../store/actions/actions';
import { MultiValue } from 'react-select';
import { useSelector } from 'react-redux';

const SearchPage = () => {
  const dispatch = useDispatch();

  const [selectedIngredients, setSelectedIngredients] = useState<
    MultiValue<ingredientType>
  >([]);

  const handleSelectionChange = (
    newIngredients: MultiValue<ingredientType>
  ) => {
    setSelectedIngredients(newIngredients);
    const selectionValues = newIngredients
      .map((ingredient: ingredientType) => ingredient.value)
      .join();
    dispatch(setIngredients(selectionValues));
  };

  const ingredientsString = useSelector((state: AppState) => state.ingredients);

  const handleSearchForRecipes = () => {
    store.dispatch(getRecipes(ingredientsString));
  };

  return (
    <div className="search-page">
      <div className="search-page-inner">
        <h1>Select Leftover Ingredients</h1>
        <div className="select-submit-wrapper">
          <MultiSelectBar
            selectedIngredients={selectedIngredients}
            handleSelectionChange={handleSelectionChange}
          />
          <RecipeSearchButton handleSearchForRecipes={handleSearchForRecipes} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
