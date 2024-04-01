const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const createGetRecipesByIngredientsUrl = (ingredients: string) => {
  const apiKey = process.env.SPOON_API_KEY;
  ingredients.toLowerCase();
  return `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=2&apiKey=${apiKey}`;
};

const createGetRecipeInfoByIdUrl = (id: number) => {
  const apiKey = process.env.SPOON_API_KEY;
  return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
};

app.get('/getRecipesFromIngredients', (req: any, res: any) => {
  let url = createGetRecipesByIngredientsUrl(req.query.ingredients);
  axios
    .get(url)
    .then((recipes: any) => {
      res.json(recipes.data);
    })
    .catch((error: any) => {
      res.json(error);
    });
});

app.get('/getRecipeLinkById', (req: any, res: any) => {
  let url = createGetRecipeInfoByIdUrl(req.query.id);
  axios
    .get(url)
    .then((recipeInfo: any) => {
      console.log('The info: ', recipeInfo);
      res.json(recipeInfo.data.spoonacularSourceUrl);
    })
    .catch((error: any) => {
      res.json(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
