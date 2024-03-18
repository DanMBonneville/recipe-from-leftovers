import { createSlice } from '@reduxjs/toolkit';
import { RecipeState } from '../../common/types';
import { getRecipes } from '../actions/actions';

const initialState = {
  recipes: [],
  recipeToView: null,
  isFecthingRecipes: false,
} satisfies RecipeState as RecipeState;

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipeToView: (state, action) => {
      state.recipeToView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state: RecipeState) => {
      state.isFecthingRecipes = true;
    });
    builder.addCase(getRecipes.fulfilled, (state: RecipeState, action: any) => {
      state.recipes = action.payload.data;
      state.isFecthingRecipes = false;
    });
    builder.addCase(getRecipes.rejected, (state: RecipeState) => {
      state.recipes = [];
      state.isFecthingRecipes = false;
    });
  },
});

export const { setRecipeToView } = recipeSlice.actions;
export default recipeSlice.reducer;
