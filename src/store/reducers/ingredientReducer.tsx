import { createSlice } from '@reduxjs/toolkit';

export interface IngredientState {
  ingredients: Array<String>;
}

const initialState = {
  ingredients: [],
} satisfies IngredientState as IngredientState;

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      console.log('In the reducer biiiitch');
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = ingredientSlice.actions;

export default ingredientSlice.reducer;
