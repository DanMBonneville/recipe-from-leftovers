const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const path = require('path');

const app = express();
app.use(
  cors({
    allowedHeaders: ['authorization', 'Content-Type'], // you can change the headers
    exposedHeaders: ['authorization'], // you can change the headers
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);
app.use(express.static(path.join(__dirname, 'build')));

const createGetRecipesByIngredientsUrl = (ingredients) => {
  const apiKey = process.env.SPOON_API_KEY;
  ingredients.toLowerCase();
  return `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=2&apiKey=${apiKey}`;
};

const createGetRecipeInfoByIdUrl = (id) => {
  const apiKey = process.env.SPOON_API_KEY;
  return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
};

app.get('/getRecipesFromIngredients', (req, res) => {
  let url = createGetRecipesByIngredientsUrl(req.query.ingredients);
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
      console.log('The info: ', recipeInfo);
      res.json(recipeInfo.data.spoonacularSourceUrl);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
