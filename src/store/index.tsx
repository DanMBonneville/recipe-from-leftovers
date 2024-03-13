import { configureStore } from '@reduxjs/toolkit';
import ingredientSlice from './reducers/ingredientReducer';
import recipeSlice from './reducers/recipeReducer';

export const store = configureStore({
  reducer: {
    ...ingredientSlice,
    ...recipeSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
