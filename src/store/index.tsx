import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientSlice from './reducers/ingredientReducer';
import recipeSlice from './reducers/recipeReducer';
import errorSlice from './reducers/errorReducer';

const rootReducer = combineReducers({
  ingredient: ingredientSlice,
  recipe: recipeSlice,
  error: errorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
