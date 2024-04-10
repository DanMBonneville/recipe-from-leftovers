import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import IngredientList from '../components/RecipeDetailsPageComponents/IngredientList';
import RecipeDetailsDescription from '../components/RecipeDetailsPageComponents/RecipeDetailsDescription';
import { AppState } from '../store';
import { emptyRecipe } from '../store/reducers/recipeReducer';

const RecipeDetailsPage = () => {
  const navigate = useNavigate();
  const recipe = useSelector((state: AppState) => state.recipe.recipeToView);
  const {
    usedIngredientCount,
    usedIngredients,
    missedIngredientCount,
    missedIngredients,
  } = recipe;

  let isFecthingRecipeInfoLink = useSelector(
    (state: AppState) => state.recipe.isFetchingRecipeInfoLink
  );

  let recipeInfoLink = useSelector(
    (state: AppState) => state.recipe.recipeInfoLink
  );

  useEffect(() => {
    if (!isFecthingRecipeInfoLink && recipe === emptyRecipe) {
      navigate('/search-for-recipes');
    }
  });

  const goToRecipeInstructions = () => {
    window.location.href = recipeInfoLink;
  };

  return (
    <div className={'recipe-details-page'}>
      <div className={'recipe-details-page-inner'}>
        <RecipeDetailsDescription />
        <div className={'ingredient-details'}>
          {isFecthingRecipeInfoLink ? (
            <Loader />
          ) : (
            <Button
              data-testid="recipe-link"
              className="recipe-link"
              variant="outlined"
              onClick={() => goToRecipeInstructions()}
            >
              {' '}
              Instructions
            </Button>
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
