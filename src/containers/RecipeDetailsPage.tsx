import { useSelector } from 'react-redux';
import IngredientList from '../components/IngredientList';
import RecipeDetailsDescription from '../components/RecipeDetailsDescription';
import { AppState } from '../store';

const RecipeDetailsPage = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);

  const {
    title,
    image,
    usedIngredientCount,
    usedIngredients,
    missedIngredientCount,
    missedIngredients,
  } = recipe;

  const totalIngredientCount = missedIngredientCount + usedIngredientCount;

  const getNumberOfIngredientsUsedMessage = () => {
    return `You already have ${usedIngredientCount} out of ${totalIngredientCount} ingredients for this dish!`;
  };

  return (
    <div className={'recipe-details-page'}>
      <div className={'recipe-details-page-inner'}>
        <RecipeDetailsDescription />
        {usedIngredientCount !== 0 && (
          <IngredientList
            ingredients={usedIngredients}
            isMissingIngredientList={false}
          />
        )}
        {missedIngredientCount !== 0 && (
          <IngredientList
            ingredients={missedIngredients}
            isMissingIngredientList={true}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
