import { useSelector } from 'react-redux';
import { AppState, store } from '../store';
import { getRecipes } from '../store/reducers/recipeReducer';

// TODO: clean this up
// css info: https://www.npmjs.com/package/@material/button#contained-button

// type RecipeSearchButtonProps = {
//   ingredients: Array<string>;
//   onSearch: (ingredients: Array<string>) => any;
// };

const RecipeSearchButton = () => {
  const ingredients = useSelector((state: AppState) => state.ingredients);

  const handleSearchForRecipes = () => {
    console.log('The ingredients');
    store.dispatch(getRecipes());
  };

  return (
    <button
      onClick={handleSearchForRecipes}
      className="recipe-search-button mdc-button mdc-button--raised"
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__focus-ring"></span>
      <span className="mdc-button__label">Search For Recipe!</span>
    </button>
  );
};

export default RecipeSearchButton;
