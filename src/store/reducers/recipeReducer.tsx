import { createSlice } from '@reduxjs/toolkit';
import { getRecipes } from '../actions/actions';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state: RecipeState) => {
      state.isFecthingRecipes = true;
    });
    builder.addCase(
      getRecipes.fulfilled,
      (state: RecipeState, payload: any) => {
        state.recipes = payload;
        state.isFecthingRecipes = false;
      }
    );
    builder.addCase(getRecipes.rejected, (state: RecipeState) => {
      state.recipes = {};
      state.isFecthingRecipes = false;
    });
  },
});

export default recipeSlice.reducer;
