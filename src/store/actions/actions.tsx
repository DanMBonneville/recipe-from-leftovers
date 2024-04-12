import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createGetAllIngredientOptionsUrl,
  createGetRecipeInfoByIdUrl,
  createGetRecipesFromIngredientsUrl,
  sendGetRequest,
} from './helpers';

export const createUser = createAsyncThunk('create-user', async () => {
  console.log('Create user function');
  return sendGetRequest('/api/fire/create-user');
});

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
