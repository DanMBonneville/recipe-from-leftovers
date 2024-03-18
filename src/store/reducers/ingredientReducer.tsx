import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientState, IngredientTypes } from '../../common/types';
import { convertStringArrToIngredientTypesArr } from '../../common/util';
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
      action: PayloadAction<IngredientTypes[]>
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
        state.ingredientOptions = convertStringArrToIngredientTypesArr(
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
