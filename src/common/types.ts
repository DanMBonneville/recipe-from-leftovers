import { MultiValue } from 'react-select';
import { store } from '../store';

/***
 *  Object Types
 */

export type IngredientTypes = {
  label: string;
  value: string;
};

export type RecipeType = {
  id: string;
  image: string;
  imageType: string;
  likes: 1;
  missedIngredientCount: number;
  missedIngredients: Array<any>;
  title: string;
  unusedIngredients: Array<any>;
  usedIngredientCount: number;
  usedIngredients: Array<any>;
};

/***
 *  Global State Types
 */
export type AppState = ReturnType<typeof store.getState>;

export interface RecipeState {
  recipes: RecipeType[];
  recipeToView: RecipeType | null;
  isFecthingRecipes: boolean;
}

export type IngredientState = {
  ingredients: IngredientTypes[];
  ingredientOptions: Array<IngredientTypes>;
  isFecthingIngredientOptions: boolean;
};

export type ErrorState = {
  showAddIngredientMessage: boolean;
};

/***
 * Prop Types
 */

export type MultiSelectBarProps = {
  isDisabled: boolean;
  options: MultiValue<IngredientTypes>;
  selectedIngredients: MultiValue<IngredientTypes>;
  handleSelectionChange: (newIngredients: MultiValue<IngredientTypes>) => void;
};

export type RecipeSearchButtonProps = {
  isDisabled: boolean;
  handleSearchForRecipes: Function;
};

export type ErrorProps = {
  message: string;
};
