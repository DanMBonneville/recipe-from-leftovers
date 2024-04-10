import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const sendGetRequest = async (url: string) => {
  try {
    return (await axios.get(url)).data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const createGetAllIngredientOptionsUrl = () => {
  return `/api/get-ingredient-options`;
};

const createGetRecipesFromIngredientsUrl = (ingredients: String) => {
  let url = '/api/get-recipes-from-ingredients';
  let ingredientString = ingredients.toLowerCase();
  return (url += `?ingredients=${ingredientString}`);
};

const createGetRecipeInfoByIdUrl = (id: number) => {
  return `/api/get-recipe-link-by-id?id=${id}`;
};

export const getIngredientOptions = createAsyncThunk(
  'get-ingredient-options',
  async () => {
    return await sendGetRequest(createGetAllIngredientOptionsUrl());
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
