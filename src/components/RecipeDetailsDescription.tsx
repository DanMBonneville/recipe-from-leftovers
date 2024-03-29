import { useSelector } from 'react-redux';
import { AppState } from '../store';

const RecipeDetailsDescription = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);
  const { title, image, usedIngredientCount, missedIngredientCount } = recipe;
  const totalIngredientCount = missedIngredientCount + usedIngredientCount;

  const getNumberOfIngredientsUsedMessage = () => {
    return `You already have ${usedIngredientCount} out of ${totalIngredientCount} ingredients for this dish!`;
  };

  return (
    <div className={'recipe-decription'}>
      <div className={'recipe-title'}>{title}</div>
      <img className={'recipe-image'} src={image} alt="recipe" />
      <div className={'recipe-ingredients-used-message'}>
        {getNumberOfIngredientsUsedMessage()}
      </div>
    </div>
  );
};

export default RecipeDetailsDescription;
