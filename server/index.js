const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { ingredientOptionsRef } = require('./firebase');
const path = require('path');
require('dotenv').config();

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
app.use(express.static(path.join(__dirname, '..', 'build')));

const spoonacular_domain = 'https://api.spoonacular.com/';
const recipe_path = 'recipes/';
const spoon_api_key_query_parm = `apiKey=${process.env.SPOON_API_KEY}`;

const createGetRecipesByIngredientsUrl = (ingredients) => {
  ingredients.toLowerCase();
  return `${spoonacular_domain}${recipe_path}findByIngredients?ingredients=${ingredients}&ranking=2&${spoon_api_key_query_parm}`;
};

const createGetRecipeInfoByIdUrl = (id) => {
  return `${spoonacular_domain}${recipe_path}${id}/information?${spoon_api_key_query_parm}`;
};

app.get('/api/get-ingredient-options', (req, res) => {
  ingredientOptionsRef
    .get()
    .then((docSnap) => {
      res.json(docSnap.data());
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/api/get-recipes-from-ingredients', (req, res) => {
  let ingredients = req.query.ingredients;
  if (ingredients) ingredients.toLowerCase();
  let url = createGetRecipesByIngredientsUrl(ingredients);
  axios
    .get(url)
    .then((recipes) => {
      res.json(recipes.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/api/get-recipe-link-by-id', (req, res) => {
  let url = createGetRecipeInfoByIdUrl(req.query.id);
  axios
    .get(url)
    .then((recipeInfo) => {
      res.json(recipeInfo.data.spoonacularSourceUrl);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.use((req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  console.error('500 error in server: ', err);
  res.status(500).send('500 - Internal Server Error: ', err);
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
