import { useSelector } from 'react-redux';
import { AppState } from '../store';

const RecipeDetailsPage = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);
  // let title = recipe?.title;
  console.log(recipe);

  const {
    title,
    image,
    // missedIngredientCount,
    // missedIngredients,
    // usedIngredientCount,
    // usedIngredients,
  } = recipe;

  return (
    <div className={'recipe-details-page'}>
      <div className={'recipe-details-page-inner'}>
        <div className={'recipe-title'}>{title}</div>
        <img src={image} alt="recipe" className={'recipe-image'} />
        <div className={'recipe-used-ingredients'}>{}</div>
        <div className={'recipe-missedIngredients'}>{}</div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
