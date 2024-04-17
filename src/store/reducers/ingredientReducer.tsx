import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientOptionType, IngredientState } from '../../common/types';
import {
  alphabatizeIngredientOptions,
  convertStringArrToIngredientOptionTypeArr,
  filterIngredientsFromIngredientList,
} from '../../common/util';
import {
  getIngredientOptions,
  getSavedSelectedIngredients,
  saveDefaultIngredients,
} from '../actions/actions';

const is = {
  isFecthingIngredientOptions: false,
  initialIngredientOptions: [],
  ingredientOptions: [],
  isFetchingDefaultSelectedIngredients: false,
  defaultSelectedIngredients: [],
  selectedIngredients: [],
};

const initialState = is satisfies IngredientState as IngredientState;

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    resetIngredientState: () => is,
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
      state.selectedIngredients = [
        ...state.selectedIngredients,
        action.payload,
      ];
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
    builder.addCase(
      getSavedSelectedIngredients.pending,
      (state: IngredientState) => {
        state.isFetchingDefaultSelectedIngredients = true;
      }
    );
    builder.addCase(
      getSavedSelectedIngredients.fulfilled,
      (state: IngredientState, action: any) => {
        const defaultSelection = action.payload;
        state.isFetchingDefaultSelectedIngredients = false;
        state.defaultSelectedIngredients = defaultSelection;
        state.selectedIngredients = defaultSelection;
        state.ingredientOptions = filterIngredientsFromIngredientList(
          defaultSelection,
          state.initialIngredientOptions
        );
      }
    );
    builder.addCase(
      getSavedSelectedIngredients.rejected,
      (state: IngredientState) => {
        state.isFetchingDefaultSelectedIngredients = false;
      }
    );
    builder.addCase(
      saveDefaultIngredients.pending,
      (state: IngredientState) => {
        state.isFetchingDefaultSelectedIngredients = true;
      }
    );
    builder.addCase(
      saveDefaultIngredients.fulfilled,
      (state: IngredientState, action: any) => {
        state.isFetchingDefaultSelectedIngredients = false;
        state.defaultSelectedIngredients = state.selectedIngredients;
      }
    );
    builder.addCase(
      saveDefaultIngredients.rejected,
      (state: IngredientState, action: any) => {
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
