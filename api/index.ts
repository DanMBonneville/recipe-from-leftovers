const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/getRecipesFromIngredients', (req: any, res: any) => {
  const apiKey = process.env.SPOON_API_KEY;
  let url = 'https://api.spoonacular.com/recipes/findByIngredients';
  url += `?ingredients=${req.query.ingredients}`;
  url += `&apiKey=${apiKey}`;
  axios.get(url).then((recipes: any) => {
    res.json(recipes.data);
  });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
