import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDoc } from 'firebase/firestore';
import { ingredientOptionsRef } from '../../firebase';

const createGetRecipesFromIngredientsUrl = (ingredients: String) => {
  let url = '/getRecipesFromIngredients';
  let ingredientString = ingredients.toLowerCase();
  return (url += `?ingredients=${ingredientString}`);
};

const createGetRecipeInfoByIdUrl = (id: number) => {
  return `/getRecipeLinkById?id=${id}`;
};

export const getRecipes = createAsyncThunk(
  'getRecipesFromIngredients',
  async (ingredients: String) => {
    axios
      .get(createGetRecipesFromIngredientsUrl(ingredients))
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
);

export const getRecipeInfo = createAsyncThunk(
  'getRecipeLinkById',
  async (id: number) => {
    axios
      .get(createGetRecipeInfoByIdUrl(id))
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
);

export const getIngredientOptions = createAsyncThunk(
  'getIngredientOptions',
  async () => {
    const docSnap = await getDoc(ingredientOptionsRef);
    return docSnap.data();
  }
);
