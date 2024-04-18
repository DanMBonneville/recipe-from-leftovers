import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createGetAllIngredientOptionsUrl,
  createGetRecipeInfoByIdUrl,
  createGetRecipesFromIngredientsUrl,
  sendGetRequest,
  sendPostRequest,
} from './utils';

export const loginUser = createAsyncThunk(
  'login-user',
  async (body: Object) => {
    return sendPostRequest('api/fire/login-user', body);
  }
);

export const createUser = createAsyncThunk(
  'create-user',
  async (body: Object) => {
    return sendPostRequest('/api/fire/create-user', body);
  }
);

export const getIngredientOptions = createAsyncThunk(
  'get-ingredient-options',
  async () => {
    return sendGetRequest(createGetAllIngredientOptionsUrl());
  }
);

export const getSavedSelectedIngredients = createAsyncThunk(
  'get-default-selected-ingredients',
  async (email: Object) => {
    return sendGetRequest(
      `/api/fire/get-default-selected-ingredients?email=${email}`
    );
  }
);
export const saveDefaultIngredients = createAsyncThunk(
  'save-default-selected-ingredients',
  async (body: Object) => {
    return sendPostRequest('/api/fire/save-default-selected-ingredients', body);
  }
);

export const getRecipes = createAsyncThunk(
  'get-recipes-from-ingredients',
  async (ingredients: String) => {
    return sendGetRequest(createGetRecipesFromIngredientsUrl(ingredients));
  }
);

export const getRecipeInfo = createAsyncThunk(
  'get-recipe-link-by-id',
  async (id: number) => {
    return sendGetRequest(createGetRecipeInfoByIdUrl(id));
  }
);
