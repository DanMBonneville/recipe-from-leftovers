import { useState } from 'react';
import MultiSelectBar, { ingredientType } from '../components/MultiSelectBar';
import RecipeSearchButton from '../components/RecipeSearchButton';
import { setIngredients } from '../store/reducers/ingredientReducer';
import { useDispatch } from 'react-redux';
import { AppState, store } from '../store';
import { getRecipes } from '../store/actions/actions';
import { MultiValue } from 'react-select';
import { useSelector } from 'react-redux';
import { createIngredientsString } from '../shared/util';
import ErrorMessage from '../components/ErrorMessage';
import { addIngredientsMessage } from '../constants/errorConstants';
import { setShowAddIngredientsMessage } from '../store/reducers/errorReducer';

const SearchPage = () => {
  const dispatch = useDispatch();
  const ingredientsString = useSelector(
    (state: AppState) => state.ingredient.ingredients
  );
  const showAddIngredientMessage = useSelector(
    (state: AppState) => state.error.showAddIngredientMessage
  );

  const [selectedIngredients, setSelectedIngredients] = useState<
    MultiValue<ingredientType>
  >([]);

  const handleSelectionChange = (
    newIngredients: MultiValue<ingredientType>
  ) => {
    setSelectedIngredients(newIngredients);
    dispatch(setShowAddIngredientsMessage(false));
    dispatch(setIngredients(createIngredientsString(newIngredients)));
  };

  const handleSearchForRecipes = () => {
    if ('' === ingredientsString) {
      dispatch(setShowAddIngredientsMessage(true));
    } else {
      store.dispatch(getRecipes(ingredientsString));
    }
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
        {showAddIngredientMessage ? (
          <ErrorMessage message={addIngredientsMessage} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
