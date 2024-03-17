import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OptionType } from '../../components/MultiSelectBar';
import { convertStringArrToOptionTypeArr } from '../../shared/convert';
import { getIngredientOptions } from '../actions/actions';

export interface IngredientState {
  ingredients: OptionType[];
  ingredientOptions: Array<OptionType>;
  isFecthingIngredientOptions: boolean;
}

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
    setSelectedIngredients: (state, action: PayloadAction<OptionType[]>) => {
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
        state.ingredientOptions = convertStringArrToOptionTypeArr(
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
