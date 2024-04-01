import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { RecipeType } from '../common/types';
import RecipePreview from '../components/RecipePreview';
import { AppState, store } from '../store';
import { getRecipeInfo } from '../store/actions/actions';
import { setRecipeToView } from '../store/reducers/recipeReducer';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isFetchingRecipes = useSelector(
    (state: AppState) => state.recipe.isFecthingRecipes
  );
  let recipes = useSelector((state: AppState) => state.recipe.recipes);

  useEffect(() => {
    if (!isFetchingRecipes && recipes.length === 0) {
      navigate('/searchPage');
    }
  });

  const openRecipe = (recipe: RecipeType) => {
    dispatch(setRecipeToView(recipe));
    store.dispatch(getRecipeInfo(recipe.id));
    navigate('/recipe/details');
  };

  let recipePreviewList: JSX.Element[] = [];
  recipes.forEach((recipe: RecipeType) => {
    recipePreviewList.push(
      <RecipePreview
        key={recipe.title}
        recipe={recipe}
        openRecipe={openRecipe}
      />
    );
  });

  return (
    <div className="search-results-page">
      <div className="search-results-title">Search Results</div>
      <hr />
      <Grid container spacing={2}>
        {recipePreviewList}
      </Grid>
    </div>
  );
};

export default SearchResultsPage;
