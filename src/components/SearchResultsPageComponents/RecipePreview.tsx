import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const RecipePreview = (props: any) => {
  const { recipe, openRecipe } = props;
  const title = recipe.title;
  const image = recipe.image;
  const missedIngredientCount = recipe.missedIngredientCount;
  const usedIngredientCount = recipe.usedIngredientCount;
  const totalIngredientCount = missedIngredientCount + usedIngredientCount;

  return (
    <Grid item display="flex" justifyContent="center" alignItems="center">
      <Card>
        <CardActionArea onClick={() => openRecipe(recipe)}>
          <CardMedia component="img" alt="recipe" image={image} />
          <CardContent background-color="primary">
            <Typography gutterBottom variant="h6" color="white" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="secondary">
              You have {usedIngredientCount} out of {totalIngredientCount}{' '}
              ingredients needed for this recipe
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default RecipePreview;
