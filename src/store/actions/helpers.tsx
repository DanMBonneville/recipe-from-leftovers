import axios from 'axios';

export const sendGetRequest = async (url: string) => {
  try {
    return (await axios.get(url)).data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createGetAllIngredientOptionsUrl = () => {
  return `/api/fire/get-ingredient-options`;
};

export const createGetRecipesFromIngredientsUrl = (ingredients: String) => {
  let url = '/api/spoon/get-recipes-from-ingredients';
  let ingredientString = ingredients.toLowerCase();
  return (url += `?ingredients=${ingredientString}`);
};

export const createGetRecipeInfoByIdUrl = (id: number) => {
  return `/api/spoon/get-recipe-link-by-id?id=${id}`;
};
