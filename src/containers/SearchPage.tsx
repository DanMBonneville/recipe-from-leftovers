import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../common/types';
import {
  convertMultipValueIngredientsToStringArr,
  convertSingleValueIngredientToIngredientOption,
} from '../common/util';
import RecipeSearchButton from '../components/RecipeSearchButton';
import SelectBar from '../components/SelectBar';
import { AppState, store } from '../store';
import { getIngredientOptions, getRecipes } from '../store/actions/actions';
import { addSelectedIngredients } from '../store/reducers/ingredientReducer';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(getIngredientOptions());
  }, []);

  let isFecthingIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let ingredientOptions = useSelector(
    (state: AppState) => state.ingredient.ingredientOptions
  );
  let selectedIngredients = useSelector(
    (state: AppState) => state.ingredient.selectedIngredients
  );

  const [recipeButtonDisabled, setRecipeButtonDisabled] = useState(true);
  const [singleValueSelectedIngredient, setSingleValueSelectedIngredient] =
    useState<SingleValue<IngredientOptionType>>({
      label: '',
      value: '',
    });

  useEffect(() => {
    if (0 === ingredientOptions.length) {
      setRecipeButtonDisabled(true);
    } else {
      setRecipeButtonDisabled(false);
    }
  }, [ingredientOptions]);

  const handleSelectionChange = (
    newIngredient: SingleValue<IngredientOptionType>
  ) => {
    setSingleValueSelectedIngredient(newIngredient);
    dispatch(
      addSelectedIngredients(
        convertSingleValueIngredientToIngredientOption(newIngredient)
      )
    );
  };

  const handleSearchForRecipes = () => {
    store.dispatch(
      getRecipes(convertMultipValueIngredientsToStringArr(selectedIngredients))
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
          <SelectBar
            isDisabled={isFecthingIngredientOptions}
            options={ingredientOptions}
            selectedIngredient={singleValueSelectedIngredient}
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
