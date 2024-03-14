interface RecipeSearchButtonProps {
  handleSearchForRecipes: Function;
}

const RecipeSearchButton = (props: RecipeSearchButtonProps) => {
  const { handleSearchForRecipes } = props;
  return (
    <button
      onClick={handleSearchForRecipes()}
      className="recipe-search-button mdc-button mdc-button--raised"
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__focus-ring"></span>
      <span className="mdc-button__label">Search For Recipe!</span>
    </button>
  );
};

export default RecipeSearchButton;
