import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientOptionType, IngredientState } from '../../common/types';
import {
  alphabatizeIngredientOptions,
  convertStringArrToIngredientOptionTypeArr,
} from '../../common/util';
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
      state.ingredientOptions = alphabatizeIngredientOptions(action.payload);
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
    addIngredientOption: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.ingredientOptions = alphabatizeIngredientOptions([
        ...state.ingredientOptions,
        action.payload,
      ]);
    },
    removeIngredientOption: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.ingredientOptions = state.ingredientOptions.filter(
        (ingredient) => ingredient.label !== action.payload.label
      );
    },
    removeSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.label !== action.payload.label
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
        state.ingredientOptions = alphabatizeIngredientOptions(
          convertStringArrToIngredientOptionTypeArr(action.payload.optionArray)
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
  addIngredientOption,
  removeIngredientOption,
  removeSelectedIngredients,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
