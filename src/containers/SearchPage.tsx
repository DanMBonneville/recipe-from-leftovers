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
import SaveIngredientListButton from '../components/SearchPageComponents/SelectedIngredientsComponents/SaveSelectedIngredientsList';
import SelectedIngredientList from '../components/SearchPageComponents/SelectedIngredientsComponents/SelectedIngredientList';
import { AppState, store } from '../store';
import {
  getDefaultIngredients,
  getIngredientOptions,
  getRecipes,
  saveDefaultIngredients,
} from '../store/actions/actions';
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

  let userId = useSelector((state: AppState) => state.user.idToken);
  let isFecthingIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let intialIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.initialIngredientOptions
  );
  let isFetchingDefaultSelectedIngredients = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let defaultSelectedIngredients = useSelector(
    (state: AppState) => state.ingredient.defaultSelectedIngredients
  );
  let ingredientOptions = useSelector(
    (state: AppState) => state.ingredient.ingredientOptions
  );
  let selectedIngredients = useSelector(
    (state: AppState) => state.ingredient.selectedIngredients
  );

  const [recipeButtonDisabled, setRecipeButtonDisabled] = useState(true);

  useEffect(() => {
    if (intialIngredientOptions.length <= 1) {
      store.dispatch(getDefaultIngredients());
    }
  }, [intialIngredientOptions]);

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

  const saveDefaultFridge = () => {
    store.dispatch(saveDefaultIngredients({ userId, selectedIngredients }));
  };

  const restoreDefaultFridge = () => {
    const ingredientOptionsMinusDefaultSelection =
      intialIngredientOptions.filter(
        (ingredient) => !defaultSelectedIngredients.includes(ingredient)
      );
    dispatch(setIngredientOptions(ingredientOptionsMinusDefaultSelection));
    dispatch(setSelectedIngredients(defaultSelectedIngredients));
  };

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
