import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorSlice from './reducers/errorReducer';
import ingredientSlice from './reducers/ingredientReducer';
import recipeSlice from './reducers/recipeReducer';

const rootReducer = combineReducers({
  ingredient: ingredientSlice,
  recipe: recipeSlice,
  error: errorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
