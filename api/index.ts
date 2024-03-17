const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
export const createUrl = (ingredients: string) => {
  const apiKey = process.env.SPOON_API_KEY;
  return `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}&ranking=2`;
};
app.get('/getRecipesFromIngredients', (req: any, res: any) => {
  let url = createUrl(req.query.ingredients);
  axios.get(url).then((recipes: any) => {
    res.json(recipes.data);
  });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
