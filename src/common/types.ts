import { SingleValue } from 'react-select';
import { store } from '../store';

/***
 *  Object Types
 */

export type IngredientOptionType = {
  label: string;
  value: string;
};

export type IngredientDescriptionType = {
  original: string;
  id: number;
  image: string;
  name: string;
};

export type RecipeType = {
  title: string;
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: IngredientDescriptionType[];
  unusedIngredients: IngredientDescriptionType[];
  usedIngredientCount: number;
  usedIngredients: IngredientDescriptionType[];
};

/***
 *  Global State Types
 */
export type AppState = ReturnType<typeof store.getState>;

export interface UserState {
  idToken: string;
  email: string;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  loginErrorMessage: string;
  isSigningUp: boolean;
  signUpErrorCode: string;
  signUpErrorMessage: string;
}

export interface RecipeState {
  recipes: RecipeType[];
  recipeToView: RecipeType;
  recipeInfoLink: string;
  isFecthingRecipes: boolean;
  isFetchingRecipeInfoLink: boolean;
}

export type IngredientState = {
  selectedIngredients: IngredientOptionType[];
  defaultSelectedIngredients: IngredientOptionType[];
  initialIngredientOptions: IngredientOptionType[];
  ingredientOptions: IngredientOptionType[];
  isFecthingIngredientOptions: boolean;
  isFetchingDefaultSelectedIngredients: boolean;
};

export type ErrorState = {
  showAddIngredientMessage: boolean;
};

/***
 * Prop Types
 */

export type SelectBarProps = {
  isSelectDisabled: boolean;
  options: IngredientOptionType[];
  handleSelectionChange: (
    newIngredient: SingleValue<IngredientOptionType>
  ) => void;
};

export type RecipeSearchButtonProps = {
  isButtonDisabled: boolean;
  handleSearchForRecipes: Function;
};

export type SelectedIngredientListProps = {
  selectedIngredients: IngredientOptionType[];
  removeIngredient: Function;
};

export type SaveSelectedIngredientsListProps = {
  saveDefaultFridge: Function;
  restoreDefaultFridge: Function;
};

export type IngredientListProps = {
  // key: number;
  ingredients: IngredientDescriptionType[];
  isMissingIngredientList: boolean;
  // isMissing: boolean;
};

export type ErrorProps = {
  message: string;
};
