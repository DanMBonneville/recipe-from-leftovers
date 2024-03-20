import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';
import { IngredientOptionType } from '../common/types';
import {
  convertMultiValueIngredientsToIngredientOptionTypeArr,
  convertMultipValueIngredientsToStringArr,
} from '../common/util';
import MultiSelectBar from '../components/MultiSelectBar';
import RecipeSearchButton from '../components/RecipeSearchButton';
import { AppState, store } from '../store';
import { getIngredientOptions, getRecipes } from '../store/actions/actions';
import { setSelectedIngredients } from '../store/reducers/ingredientReducer';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipeButtonDisabled, setRecipeButtonDisabled] = useState(true);
  const [multiValueSelectedIngredients, setMultiValueSelectedIngredients] =
    useState<MultiValue<IngredientOptionType>>([]);

  let isFecthingIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let ingredientOptions = useSelector(
    (state: AppState) => state.ingredient.ingredientOptions
  );

  useEffect(() => {
    store.dispatch(getIngredientOptions());
  }, []);

  useEffect(() => {
    if (0 === multiValueSelectedIngredients.length) {
      setRecipeButtonDisabled(true);
    } else {
      setRecipeButtonDisabled(false);
    }
  }, [multiValueSelectedIngredients]);

  const handleSelectionChange = (
    newIngredients: MultiValue<IngredientOptionType>
  ) => {
    setMultiValueSelectedIngredients(newIngredients);
    dispatch(
      setSelectedIngredients(
        convertMultiValueIngredientsToIngredientOptionTypeArr(newIngredients)
      )
    );
  };

  const handleSearchForRecipes = () => {
    store.dispatch(
      getRecipes(
        convertMultipValueIngredientsToStringArr(multiValueSelectedIngredients)
      )
    );
    navigate('/searchResults');
  };

  return (
    <div className="search-page">
      <div className="search-page-inner">
        <div className="select-prompt">
          <h1>Leftovers?</h1>
          <h1>Let's find a Recipe!</h1>
        </div>
        <div className="select-submit-wrapper">
          <MultiSelectBar
            isDisabled={isFecthingIngredientOptions}
            options={ingredientOptions}
            selectedIngredients={multiValueSelectedIngredients}
            handleSelectionChange={handleSelectionChange}
          />
          <RecipeSearchButton
            isDisabled={recipeButtonDisabled}
            handleSearchForRecipes={handleSearchForRecipes}
          />
        </div>
        <div className="display-selection"></div>
      </div>
    </div>
  );
};

export default SearchPage;
