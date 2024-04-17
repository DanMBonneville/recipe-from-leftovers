import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../common/types';
import {
  convertIngredientOptionArrToStringArr,
  convertListToObject,
  convertSingleValueIngredientToIngredientOption,
  filterIngredientsFromIngredientList,
} from '../common/util';
import Loader from '../components/Loader';
import SelectIngredientsPrompt from '../components/SearchPageComponents/SelectIngredientsPrompt';
import SelectSubmitIngredients from '../components/SearchPageComponents/SelectSubmitIngredients/SelectSubmitIngredients';
import SaveIngredientListButton from '../components/SearchPageComponents/SelectedIngredientsComponents/SaveSelectedIngredientsList';
import SelectedIngredientList from '../components/SearchPageComponents/SelectedIngredientsComponents/SelectedIngredientList';
import { AppState, store } from '../store';
import { getRecipes, saveDefaultIngredients } from '../store/actions/actions';
import {
  addIngredientOption,
  addSelectedIngredients,
  removeIngredientOption,
  removeSelectedIngredients,
  setIngredientOptions,
  setSelectedIngredients,
} from '../store/reducers/ingredientReducer';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let email = useSelector((state: AppState) => state.user.email);

  // is loading
  let isFecthingIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let isFetchingDefaultSelectedIngredients = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  // initial state
  let intialIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.initialIngredientOptions
  );
  let defaultSelectedIngredients = useSelector(
    (state: AppState) => state.ingredient.defaultSelectedIngredients
  );
  // app state
  let ingredientOptions = useSelector(
    (state: AppState) => state.ingredient.ingredientOptions
  );
  let selectedIngredients = useSelector(
    (state: AppState) => state.ingredient.selectedIngredients
  );

  const [recipeButtonDisabled, setRecipeButtonDisabled] = useState(true);

  useEffect(() => {
    if (0 === selectedIngredients.length) {
      setRecipeButtonDisabled(true);
    } else {
      setRecipeButtonDisabled(false);
    }
  }, [selectedIngredients]);

  const saveDefaultFridge = () => {
    const selectedIngredientsObject = convertListToObject(selectedIngredients);
    store.dispatch(
      saveDefaultIngredients({ email, selectedIngredientsObject })
    );
  };

  const restoreDefaultFridge = () => {
    const ingredientOptionsMinusDefaultSelection =
      filterIngredientsFromIngredientList(
        defaultSelectedIngredients,
        intialIngredientOptions
      );
    dispatch(setIngredientOptions(ingredientOptionsMinusDefaultSelection));
    dispatch(setSelectedIngredients(defaultSelectedIngredients));
  };

  const handleSelectionChange = (
    newIngredient: SingleValue<IngredientOptionType>
  ) => {
    if (!newIngredient || newIngredient?.label === '') {
      return;
    }
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

  if (
    ingredientOptions.length === 0 ||
    isFecthingIngredientOptions ||
    isFetchingDefaultSelectedIngredients
  ) {
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
        <SaveIngredientListButton
          saveDefaultFridge={saveDefaultFridge}
          restoreDefaultFridge={restoreDefaultFridge}
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
