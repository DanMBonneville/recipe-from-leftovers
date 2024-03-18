const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
const createUrl = (ingredients: string) => {
  const apiKey = process.env.SPOON_API_KEY;
  ingredients.toLowerCase();
  return `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=2&apiKey=${apiKey}`;
};
app.get('/getRecipesFromIngredients', (req: any, res: any) => {
  let url = createUrl(req.query.ingredients);
  axios
    .get(url)
    .then((recipes: any) => {
      console.log('The response: ', recipes);
      res.json(recipes.data);
    })
    .catch((error: any) => {
      res.json(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
