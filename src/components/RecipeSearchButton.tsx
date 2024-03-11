import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppState } from '../store';
import * as actions from '../store/actions';

// TODO: clean this up
// css info: https://www.npmjs.com/package/@material/button#contained-button

// type RecipeSearchButtonProps = {
//   ingredients: Array<string>;
//   onSearch: (ingredients: Array<string>) => any;
// };

const handleClick = (ingredients: Array<String>, dispatch: any) => {
  console.log('Is it clicking?');
  dispatch(actions.searchRecepiesByIngredients(ingredients));
};

const RecipeSearchButton = () => {
  const ingredients = useSelector((state: AppState) => state.ingredients);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => handleClick(ingredients, dispatch)}
      className="recipe-search-button mdc-button mdc-button--raised"
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__focus-ring"></span>
      <span className="mdc-button__label">Search For Recipe!</span>
    </button>
  );
};

export default RecipeSearchButton;
