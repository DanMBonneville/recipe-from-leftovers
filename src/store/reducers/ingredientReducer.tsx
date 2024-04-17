import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientOptionType, IngredientState } from '../../common/types';
import {
  alphabatizeIngredientOptions,
  convertStringArrToIngredientOptionTypeArr,
} from '../../common/util';
import {
  getDefaultIngredients,
  getIngredientOptions,
  saveDefaultIngredients,
} from '../actions/actions';

const initialState = {
  isFecthingIngredientOptions: false,
  initialIngredientOptions: [],
  ingredientOptions: [],
  isFetchingDefaultSelectedIngredients: false,
  defaultSelectedIngredients: [],
  selectedIngredients: [],
} satisfies IngredientState as IngredientState;

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    resetIngredientState: () => initialState,
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
      console.log('The state: ', state);
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
    removeSelectedIngredients: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.label !== action.payload.label
      );
    },
    removeIngredientOption: (
      state,
      action: PayloadAction<IngredientOptionType>
    ) => {
      state.ingredientOptions = state.ingredientOptions.filter(
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
        const orderedIngredientOptions = alphabatizeIngredientOptions(
          convertStringArrToIngredientOptionTypeArr(action.payload.optionArray)
        );
        state.initialIngredientOptions = orderedIngredientOptions;
        state.ingredientOptions = orderedIngredientOptions;
        state.isFecthingIngredientOptions = false;
      }
    );
    builder.addCase(getIngredientOptions.rejected, (state: IngredientState) => {
      state.ingredientOptions = [];
      state.isFecthingIngredientOptions = false;
    });
    builder.addCase(getDefaultIngredients.pending, (state: IngredientState) => {
      state.isFetchingDefaultSelectedIngredients = true;
    });
    builder.addCase(
      getDefaultIngredients.fulfilled,
      (state: IngredientState, action: any) => {
        state.isFetchingDefaultSelectedIngredients = false;
        state.defaultSelectedIngredients = action.payload;
        state.selectedIngredients = action.payload;
      }
    );
    builder.addCase(
      getDefaultIngredients.rejected,
      (state: IngredientState) => {
        state.isFetchingDefaultSelectedIngredients = false;
      }
    );
    builder.addCase(
      saveDefaultIngredients.pending,
      (state: IngredientState) => {
        state.isFetchingDefaultSelectedIngredients = true;
        state.defaultSelectedIngredients = state.selectedIngredients;
      }
    );
    builder.addCase(
      saveDefaultIngredients.fulfilled,
      (state: IngredientState, action: any) => {
        console.log('success! ', action.payload);

        state.isFetchingDefaultSelectedIngredients = false;
      }
    );
    builder.addCase(
      saveDefaultIngredients.rejected,
      (state: IngredientState, action: any) => {
        console.log('failure :(');
        state.isFetchingDefaultSelectedIngredients = false;
      }
    );
  },
});

export const {
  resetIngredientState,
  setIngredientOptions,
  setSelectedIngredients,
  addSelectedIngredients,
  addIngredientOption,
  removeIngredientOption,
  removeSelectedIngredients,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
