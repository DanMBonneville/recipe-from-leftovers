import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import RecipeDetailsDescription from '../components/RecipeDetailsDescription';
import { AppState } from '../store';
import { emptyRecipe } from '../store/reducers/recipeReducer';

const RecipeDetailsPage = () => {
  const navigate = useNavigate();
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);

  let isFecthingRecipeInfoLink = useSelector(
    (state: AppState) => state.recipe.isFetchingRecipeInfoLink
  );

  let recipeInfoLink = useSelector(
    (state: AppState) => state.recipe.recipeInfoLink
  );

  useEffect(() => {
    if (!isFecthingRecipeInfoLink && recipe === emptyRecipe) {
      navigate('/searchPage');
    }
  });

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
          {!isFecthingRecipeInfoLink && (
            <Link className="recipe-link" to={recipeInfoLink}>
              Instructions
            </Link>
          )}
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
