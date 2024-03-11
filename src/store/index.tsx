import { configureStore } from '@reduxjs/toolkit';
import ingredientSlice, { IngredientState } from './reducers/ingredientReducer';
import recipeSlice, { RecipeState } from './reducers/recipeReducer';

export interface AppState extends IngredientState, RecipeState {}

export const store = configureStore({
  reducer: {
    ingredients: ingredientSlice,
    recipes: recipeSlice,
  },
});
