import { createSlice } from '@reduxjs/toolkit';
import { ErrorState } from '../../common/types';

const initialState = {
  showAddIngredientMessage: false,
} satisfies ErrorState as ErrorState;

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setShowAddIngredientsMessage: (state, action) => {
      state.showAddIngredientMessage = action.payload;
    },
  },
});

export const { setShowAddIngredientsMessage } = errorSlice.actions;
export default errorSlice.reducer;
