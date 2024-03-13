import { useSelector } from 'react-redux';
import { AppState, store } from '../store';
import { getRecipes } from '../store/actions/actions';

const RecipeSearchButton = () => {
  const ingredients = useSelector((state: AppState) => state.ingredients);

  const handleSearchForRecipes = () => {
    store.dispatch(getRecipes(ingredients));
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
