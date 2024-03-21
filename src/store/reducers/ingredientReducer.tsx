import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientOptionType, IngredientState } from '../../common/types';
import { convertStringArrToIngredientOptionTypeArr } from '../../common/util';
import { getIngredientOptions } from '../actions/actions';

const initialState = {
  selectedIngredients: [],
  ingredientOptions: [
    {
      label: '',
      value: '',
    },
  ],
  isFecthingIngredientOptions: false,
} satisfies IngredientState as IngredientState;

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientOptions: (
      state,
      action: PayloadAction<IngredientOptionType[]>
    ) => {
      state.ingredientOptions = action.payload;
    },
    setSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType[]>
    ) => {
      state.selectedIngredients = action.payload;
    },
    addSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.selectedIngredients.push(action.payload);
    },
    removeSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      const labelOnRemovedIngredient = action.payload.label;
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.label !== labelOnRemovedIngredient
      );
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

export const {
  setSelectedIngredients,
  addSelectedIngredients,
  removeSelectedIngredients,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
