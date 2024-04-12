import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import errorReducer from './reducers/errorReducer';
import ingredientReducer from './reducers/ingredientReducer';
import recipeReducer from './reducers/recipeReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ingredient: ingredientReducer,
  recipe: recipeReducer,
  error: errorReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
