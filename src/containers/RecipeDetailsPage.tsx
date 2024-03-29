import { useSelector } from 'react-redux';
import IngredientList from '../components/IngredientList';
import RecipeDetailsDescription from '../components/RecipeDetailsDescription';
import { AppState } from '../store';

const RecipeDetailsPage = () => {
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);

  const {
    usedIngredientCount,
    usedIngredients,
    missedIngredientCount,
    missedIngredients,
  } = recipe;

  return (
    <div className={'recipe-details-page'}>
      <div className={'recipe-details-page-inner'}>
        <RecipeDetailsDescription />
        <div className={'ingredient-details'}>
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
    </div>
  );
};

export default RecipeDetailsPage;
