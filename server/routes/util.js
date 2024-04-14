const spoonacular_domain = 'https://api.spoonacular.com/';
const recipe_path = 'recipes/';

const createLoginUrl = (apiKey) => {
  return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
};

const createGetRecipesByIngredientsUrl = (ingredients, apiKey) => {
  ingredients.toLowerCase();
  return `${spoonacular_domain}${recipe_path}findByIngredients?ingredients=${ingredients}&ranking=2&apiKey=${apiKey}`;
};

const createGetRecipeInfoByIdUrl = (id, apiKey) => {
  return `${spoonacular_domain}${recipe_path}${id}/information?apiKey=${apiKey}`;
};

module.exports = {
  createLoginUrl,
  createGetRecipesByIngredientsUrl,
  createGetRecipeInfoByIdUrl,
};
