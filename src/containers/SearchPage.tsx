import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../common/types';
import {
  convertIngredientOptionArrToStringArr,
  convertSingleValueIngredientToIngredientOption,
} from '../common/util';
import SelectIngredientsPrompt from '../components/SelectIngredientsPrompt';
import SelectSubmitIngredients from '../components/SelectSubmitIngredients/SelectSubmitIngredients';
import SelectedIngredientList from '../components/SelectedIngredientList';
import { AppState, store } from '../store';
import { getIngredientOptions, getRecipes } from '../store/actions/actions';
import {
  addSelectedIngredients,
  removeSelectedIngredients,
} from '../store/reducers/ingredientReducer';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (ingredientOptions.length <= 1) {
      store.dispatch(getIngredientOptions());
    }
  }, [ingredientOptions]);

  useEffect(() => {
    if (0 === selectedIngredients.length) {
      setRecipeButtonDisabled(true);
    } else {
      setRecipeButtonDisabled(false);
    }
  }, [selectedIngredients]);

  const handleSelectionChange = (
    newIngredient: SingleValue<IngredientOptionType>
  ) => {
    dispatch(
      addSelectedIngredients(
        convertSingleValueIngredientToIngredientOption(newIngredient)
      )
    );
  };

  const handleSearchForRecipes = () => {
    store.dispatch(
      getRecipes(convertIngredientOptionArrToStringArr(selectedIngredients))
    );
    navigate('/searchResults');
  };

  const handleIngredientRemoval = (ingredient: IngredientOptionType) => {
    dispatch(removeSelectedIngredients(ingredient));
  };

  return (
    <div className="search-page">
      <div className="search-page-inner">
        <SelectIngredientsPrompt />
        <SelectSubmitIngredients
          isSelectDisabled={isFecthingIngredientOptions}
          isButtonDisabled={recipeButtonDisabled}
          options={ingredientOptions}
          handleSelectionChange={handleSelectionChange}
          handleSearchForRecipes={handleSearchForRecipes}
        />
        <SelectedIngredientList
          selectedIngredients={selectedIngredients}
          removeIngredient={handleIngredientRemoval}
        />
      </div>
    </div>
  );
};

export default SearchPage;
