import { useSelector } from 'react-redux';
import { AppState } from '../store';

const RecipeDetailsPage = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);
  let title = recipe?.title;

  return <div>recipe title: {title}</div>;
};

export default RecipeDetailsPage;
