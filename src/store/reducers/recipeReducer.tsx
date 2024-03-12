import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface RecipeState {
  recipes: {};
  isFecthingRecipes: boolean;
}

const initialState = {
  recipes: {},
  isFecthingRecipes: false,
} satisfies RecipeState as RecipeState;

//differentfile
export const getRecipes = createAsyncThunk('getRecipes', async () => {
  const url =
    'https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar';
  axios.get(url).then((recipes) => {
    console.log('Recipes: ', recipes);
    console.log('Got recipes, if you see this, commit and push');
  });
});

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
