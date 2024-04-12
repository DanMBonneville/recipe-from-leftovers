import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../common/types';
import {
  convertIngredientOptionArrToStringArr,
  convertSingleValueIngredientToIngredientOption,
} from '../common/util';
import Loader from '../components/Loader';
import SelectIngredientsPrompt from '../components/SearchPageComponents/SelectIngredientsPrompt';
import SelectSubmitIngredients from '../components/SearchPageComponents/SelectSubmitIngredients/SelectSubmitIngredients';
import SelectedIngredientList from '../components/SearchPageComponents/SelectedIngredientList';
import { AppState, store } from '../store';
import { getIngredientOptions, getRecipes } from '../store/actions/actions';
import {
  addIngredientOption,
  addSelectedIngredients,
  removeIngredientOption,
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
    const selectedIngredient =
      convertSingleValueIngredientToIngredientOption(newIngredient);
    dispatch(addSelectedIngredients(selectedIngredient));
    dispatch(removeIngredientOption(selectedIngredient));
  };

  const handleIngredientRemoval = (ingredient: IngredientOptionType) => {
    dispatch(removeSelectedIngredients(ingredient));
    dispatch(addIngredientOption(ingredient));
  };

  const handleSearchForRecipes = () => {
    store.dispatch(
      getRecipes(convertIngredientOptionArrToStringArr(selectedIngredients))
    );
    navigate('/recipe-preview-list');
  };

  if (isFecthingIngredientOptions) {
    return <Loader />;
  }

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
