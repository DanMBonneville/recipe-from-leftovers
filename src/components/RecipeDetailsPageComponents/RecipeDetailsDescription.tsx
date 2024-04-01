import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const RecipeDetailsDescription = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);
  const { title, image, usedIngredientCount, missedIngredientCount } = recipe;
  const totalIngredientCount = missedIngredientCount + usedIngredientCount;
  const numberOfIngredientsUsedMessage = `You already have ${usedIngredientCount} out of ${totalIngredientCount} ingredients for this dish!`;

  return (
    <div className={'recipe-description'}>
      <div className={'recipe-title'}>{title}</div>
      <img className={'recipe-image'} src={image} alt="recipe" />
      <div className={'recipe-num-ingredients-used-message'}>
        {numberOfIngredientsUsedMessage}
      </div>
    </div>
  );
};

export default RecipeDetailsDescription;
