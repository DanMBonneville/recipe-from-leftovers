import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';
import { IngredientTypes } from '../common/types';
import {
  convertMultiValueIngredientsToIngredientTypesArr,
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
    useState<MultiValue<IngredientTypes>>([]);

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
    newIngredients: MultiValue<IngredientTypes>
  ) => {
    setMultiValueSelectedIngredients(newIngredients);
    dispatch(
      setSelectedIngredients(
        convertMultiValueIngredientsToIngredientTypesArr(newIngredients)
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
        <h1>Select Leftover Ingredients</h1>
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
      </div>
    </div>
  );
};

export default SearchPage;
