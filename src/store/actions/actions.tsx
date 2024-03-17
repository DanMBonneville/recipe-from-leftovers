import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDoc } from 'firebase/firestore';
import { ingredientOptionsRef } from '../../firebase';

const createGetRecipesURL = (ingredients: String) => {
  let url = 'http://localhost:8000/getRecipesFromIngredients';
  return (url += `?ingredients=${ingredients}`);
};

export const getRecipes = createAsyncThunk(
  'getRecipesFromIngredients',
  async (ingredients: String) => {
    return await axios.get(createGetRecipesURL(ingredients));
  }
);

export const getIngredientOptions = createAsyncThunk(
  'getIngredientOptions',
  async () => {
    const docSnap = await getDoc(ingredientOptionsRef);
    return docSnap.data();
  }
);
