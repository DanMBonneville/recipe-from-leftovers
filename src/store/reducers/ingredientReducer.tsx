import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientOptionType, IngredientState } from '../../common/types';
import { convertStringArrToIngredientOptionTypeArr } from '../../common/util';
import { getIngredientOptions } from '../actions/actions';

const initialState = {
  ingredients: [],
  ingredientOptions: [],
  isFecthingIngredientOptions: false,
} satisfies IngredientState as IngredientState;

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientOptions: (state, action) => {
      state.ingredientOptions = action.payload;
    },
    setSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType[]>
    ) => {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientOptions.pending, (state: IngredientState) => {
      state.isFecthingIngredientOptions = true;
    });
    builder.addCase(
      getIngredientOptions.fulfilled,
      (state: IngredientState, action: any) => {
        state.ingredientOptions = convertStringArrToIngredientOptionTypeArr(
          action.payload.optionArray
        );
        state.isFecthingIngredientOptions = false;
      }
    );
    builder.addCase(getIngredientOptions.rejected, (state: IngredientState) => {
      state.ingredientOptions = [];
      state.isFecthingIngredientOptions = false;
    });
  },
});

export const { setSelectedIngredients } = ingredientSlice.actions;

export default ingredientSlice.reducer;
