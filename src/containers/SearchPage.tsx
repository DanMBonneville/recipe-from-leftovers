import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';
import MultiSelectBar, { OptionType } from '../components/MultiSelectBar';
import RecipeSearchButton from '../components/RecipeSearchButton';
import { convertMultiValueIngredientsToOptionTypeIngredients } from '../shared/convert';
import { createIngredientsString } from '../shared/util';
import { store } from '../store';
import { getIngredientOptions, getRecipes } from '../store/actions/actions';
import { setSelectedIngredients } from '../store/reducers/ingredientReducer';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipeButtonEnabled, setRecipeButtonEnabled] = useState(false);
  const [multiValueSelectedIngredients, setMultiValueSelectedIngredients] =
    useState<MultiValue<OptionType>>([]);

  useEffect(() => {
    store.dispatch(getIngredientOptions());
  }, []);

  useEffect(() => {
    if (0 === multiValueSelectedIngredients.length) {
      setRecipeButtonEnabled(false);
    } else {
      setRecipeButtonEnabled(true);
    }
  }, [multiValueSelectedIngredients]);

  const handleSelectionChange = (newIngredients: MultiValue<OptionType>) => {
    setMultiValueSelectedIngredients(newIngredients);
    dispatch(
      setSelectedIngredients(
        convertMultiValueIngredientsToOptionTypeIngredients(newIngredients)
      )
    );
  };

  const handleSearchForRecipes = () => {
    store.dispatch(
      getRecipes(createIngredientsString(multiValueSelectedIngredients))
    );
    navigate('/searchResults');
  };

  return (
    <div className="search-page">
      <div className="search-page-inner">
        <h1>Select Leftover Ingredients</h1>
        <div className="select-submit-wrapper">
          <MultiSelectBar
            selectedIngredients={multiValueSelectedIngredients}
            handleSelectionChange={handleSelectionChange}
          />
          <RecipeSearchButton
            isEnabled={recipeButtonEnabled}
            handleSearchForRecipes={handleSearchForRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
