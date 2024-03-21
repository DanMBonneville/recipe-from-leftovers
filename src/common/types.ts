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
  id: string;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: IngredientDescriptionType[];
  title: string;
  unusedIngredients: IngredientDescriptionType[];
  usedIngredientCount: number;
  usedIngredients: IngredientDescriptionType[];
};

/***
 *  Global State Types
 */
export type AppState = ReturnType<typeof store.getState>;

export interface RecipeState {
  recipes: RecipeType[];
  recipeToView: RecipeType;
  isFecthingRecipes: boolean;
}

export type IngredientState = {
  selectedIngredients: IngredientOptionType[];
  ingredientOptions: Array<IngredientOptionType>;
  isFecthingIngredientOptions: boolean;
};

export type ErrorState = {
  showAddIngredientMessage: boolean;
};

/***
 * Prop Types
 */

export type SelectBarProps = {
  isDisabled: boolean;
  options: SingleValue<IngredientOptionType>[];
  selectedIngredient: SingleValue<IngredientOptionType>;
  handleSelectionChange: (
    newIngredient: SingleValue<IngredientOptionType>
  ) => void;
};

export type RecipeSearchButtonProps = {
  isDisabled: boolean;
  handleSearchForRecipes: Function;
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
