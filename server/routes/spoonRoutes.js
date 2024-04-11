const express = require('express');
const axios = require('axios');

const spoonRouter = express.Router();

const {
  createGetRecipesByIngredientsUrl,
  createGetRecipeInfoByIdUrl,
} = require('./helpers');

spoonRouter.get('/get-recipes-from-ingredients', (req, res) => {
  const apiKey = req.spoonKey;
  let ingredients = req.query.ingredients;
  if (ingredients) ingredients.toLowerCase();
  let url = createGetRecipesByIngredientsUrl(ingredients, apiKey);
  axios
    .get(url)
    .then((recipes) => {
      res.json(recipes.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

spoonRouter.get('/get-recipe-link-by-id', (req, res) => {
  const apiKey = req.spoonKey;
  let url = createGetRecipeInfoByIdUrl(req.query.id, apiKey);
  axios
    .get(url)
    .then((recipeInfo) => {
      res.json(recipeInfo.data.spoonacularSourceUrl);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = spoonRouter;
