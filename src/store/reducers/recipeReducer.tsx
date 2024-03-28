import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RecipeState, RecipeType } from '../../common/types';
import { getRecipes } from '../actions/actions';

const emptyRecipe: RecipeType = {
  id: '',
  image: '',
  imageType: '',
  likes: 0,
  missedIngredientCount: 0,
  missedIngredients: [],
  title: '',
  unusedIngredients: [],
  usedIngredientCount: 0,
  usedIngredients: [],
};

const initialState = {
  recipes: [],
  recipeToView: emptyRecipe,
  isFecthingRecipes: false,
} satisfies RecipeState as unknown as RecipeState;

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipeToView: (state, action: PayloadAction<RecipeType>) => {
      state.recipeToView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state: RecipeState) => {
      state.isFecthingRecipes = true;
    });
    builder.addCase(getRecipes.fulfilled, (state: RecipeState, action: any) => {
      state.recipes = action.payload;
      state.isFecthingRecipes = false;
    });
    builder.addCase(getRecipes.rejected, (state: RecipeState) => {
      state.recipes = [];
      state.isFecthingRecipes = false;
      console.log('failed??');
    });
  },
});

export const { setRecipeToView } = recipeSlice.actions;
export default recipeSlice.reducer;
