import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import RecipePreview from '../components/RecipePreview';
import { AppState } from '../store';
import { Recipe, setRecipeToView } from '../store/reducers/recipeReducer';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let recipes = useSelector((state: AppState) => state.recipe.recipes);

  const openRecipe = (recipe: Recipe) => {
    dispatch(setRecipeToView(recipe));
    navigate('/recipe/details');
  };

  let recipePreviewList: JSX.Element[] = [];
  recipes.forEach((recipe: Recipe) => {
    recipePreviewList.push(
      <RecipePreview recipe={recipe} openRecipe={openRecipe} />
    );
  });

  return (
    <div>
      <h1>Search Results</h1>
      <Grid container spacing={2}>
        {recipePreviewList}
      </Grid>
    </div>
  );
};

export default SearchResultsPage;
