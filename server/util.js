const spoonacular_domain = 'https://api.spoonacular.com/';
const recipe_path = 'recipes/';
const spoon_api_key_query_parm = `apiKey=${process.env.SPOON_API_KEY}`;

const createGetRecipesByIngredientsUrl = (ingredients) => {
  ingredients.toLowerCase();
  return `${spoonacular_domain}${recipe_path}recipes/findByIngredients?ingredients=${ingredients}&ranking=2&${spoon_api_key_query_parm}`;
};

const createGetRecipeInfoByIdUrl = (id) => {
  return `${spoonacular_domain}${recipe_path}${id}/information?${spoon_api_key_query_parm}`;
};

module.exports = {
  createGetRecipesByIngredientsUrl,
  createGetRecipeInfoByIdUrl,
};
