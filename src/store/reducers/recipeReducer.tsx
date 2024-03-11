import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RecipeState {
  recipes: {};
  isFecthingRecipes: boolean;
}

const initialState = {
  recipes: {},
  isFecthingRecipes: false,
} satisfies RecipeState as RecipeState;

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    searchForRecipeStart: (state) => {
      state.isFecthingRecipes = true;
    },
    searchForRecipeSuccess: (state, action: PayloadAction<{}>) => {
      state.recipes = action.payload;
      state.isFecthingRecipes = false;
    },
    searchForRecipeFail: (state) => {
      state.recipes = {};
      state.isFecthingRecipes = false;
    },
  },
});

export default recipeSlice.reducer;
