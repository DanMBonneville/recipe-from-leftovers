import {
  createGetRecipeInfoByIdUrl,
  createGetRecipesByIngredientsUrl,
} from './util';

const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors);
app.use(express.static('build'));

app.get('/getRecipesFromIngredients', (req, res) => {
  let ingredients = req.query.ingredients;
  if (ingredients) ingredients.toLowerCase();
  let url = createGetRecipesByIngredientsUrl(ingredients);
  axios
    .get(url)
    .then((recipes) => {
      res.json(recipes.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get('/getRecipeLinkById', (req, res) => {
  let url = createGetRecipeInfoByIdUrl(req.query.id);
  axios
    .get(url)
    .then((recipeInfo) => {
      res.json(recipeInfo.data.spoonacularSourceUrl);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.use((req, res, next) => {
  res.status(404).send('404 - not found: ', req.query);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('500 - Internal Server Error: ', err);
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
