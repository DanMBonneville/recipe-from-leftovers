import axios from 'axios';
import * as actionTypes from './actionTypes';

// TODO: dynamically construct the URL
const url =
  'https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2';

export const searchForReceipesSuccess = (recipes: any) => {
  return {
    type: actionTypes.SEARCH_FOR_RECEIPES_SUCESS,
    receipes: recipes,
  };
};

export const searchRecepiesByIngredients = (
  ingredients: any
  // token: string
) => {
  // TODO dynamically contruct the URL with the orderData
  console.log(
    'These are the ingredients... do we need the token? ',
    ingredients
    // token
  );
  return (dispatch: (arg0: any) => void) => {
    // TODO: Add a loading bar
    // dispatch(searchResipesStart());
    axios.get(url).then((recipes) => {
      dispatch(searchForReceipesSuccess(recipes));
    });
  };
};
