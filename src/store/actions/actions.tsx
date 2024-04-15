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
