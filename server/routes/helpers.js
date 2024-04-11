const spoonacular_domain = 'https://api.spoonacular.com/';
const recipe_path = 'recipes/';

const createGetRecipesByIngredientsUrl = (ingredients, apiKey) => {
  ingredients.toLowerCase();
  return `${spoonacular_domain}${recipe_path}findByIngredients?ingredients=${ingredients}&ranking=2&apiKey=${apiKey}`;
};

const createGetRecipeInfoByIdUrl = (id, apiKey) => {
  return `${spoonacular_domain}${recipe_path}${id}/information?apiKey=${apiKey}`;
};

module.exports = {
  createGetRecipesByIngredientsUrl,
  createGetRecipeInfoByIdUrl,
};
