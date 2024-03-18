import { createSlice } from '@reduxjs/toolkit';
import { getRecipes } from '../actions/actions';

export interface RecipeState {
  recipes: Recipe[];
  recipeToView: Recipe | null;
  isFecthingRecipes: boolean;
}

export type Recipe = {
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
