import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDoc } from 'firebase/firestore';
import { ingredientOptionsRef } from '../../firebase';

const createGetRecipesFromIngredientsUrl = (ingredients: String) => {
  let url = 'http://localhost:8000/getRecipesFromIngredients';
  let ingredientString = ingredients.toLowerCase();
  return (url += `?ingredients=${ingredientString}`);
};

const createGetRecipeInfoByIdUrl = (id: number) => {
  return `http://localhost:8000/getRecipeLinkById?id=${id}`;
};

export const getRecipes = createAsyncThunk(
  'getRecipesFromIngredients',
  async (ingredients: String) => {
    return (await axios.get(createGetRecipesFromIngredientsUrl(ingredients)))
      .data;
  }
);

export const getRecipeInfo = createAsyncThunk(
  'getRecipeLinkById',
  async (id: number) => {
    return (await axios.get(createGetRecipeInfoByIdUrl(id))).data;
  }
);

export const getIngredientOptions = createAsyncThunk(
  'getIngredientOptions',
  async () => {
    const docSnap = await getDoc(ingredientOptionsRef);
    return docSnap.data();
  }
);
