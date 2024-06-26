import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RecipeState, RecipeType } from '../../common/types';
import { getRecipeInfo, getRecipes } from '../actions/actions';

export const emptyRecipe: RecipeType = {
  id: 0,
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
  recipeInfoLink: '',
  isFecthingRecipes: false,
  isFetchingRecipeInfoLink: false,
} satisfies RecipeState as unknown as RecipeState;

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    resetRecipesState: () => initialState,
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
    builder.addCase(getRecipes.rejected, (state: RecipeState, action: any) => {
      state.recipes = [];
      state.isFecthingRecipes = false;
    });
    builder.addCase(getRecipeInfo.pending, (state: RecipeState) => {
      state.isFetchingRecipeInfoLink = true;
    });
    builder.addCase(
      getRecipeInfo.fulfilled,
      (state: RecipeState, action: any) => {
        state.recipeInfoLink = action.payload;
        state.isFetchingRecipeInfoLink = false;
      }
    );
    builder.addCase(getRecipeInfo.rejected, (state: RecipeState) => {
      state.recipeInfoLink = '';
      state.isFetchingRecipeInfoLink = false;
    });
  },
});

export const { resetRecipesState, setRecipeToView } = recipeSlice.actions;
export default recipeSlice.reducer;
