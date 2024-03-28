import { CardActionArea, useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const RecipePreview = (props: any) => {
  const { recipe, openRecipe } = props;
  const title = recipe.title;
  const image = recipe.image;
  const isMobileScreen = useMediaQuery('min-width: 768px');
  const xsForRecipePreview = isMobileScreen ? 4 : 12;

  return (
    <Grid
      item
      xs={xsForRecipePreview}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardActionArea onClick={() => openRecipe(recipe)}>
          <CardMedia component="img" alt="recipe" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is maybe where a description could go
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default RecipePreview;
