interface RecipeSearchButtonProps {
  isEnabled: boolean;
  handleSearchForRecipes: Function;
}

const RecipeSearchButton = (props: RecipeSearchButtonProps) => {
  const { isEnabled, handleSearchForRecipes } = props;
  return (
    <button
      data-testid="recipe-search-button"
      disabled={!isEnabled}
      onClick={() => handleSearchForRecipes()}
      className="recipe-search-button mdc-button mdc-button--raised"
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__focus-ring"></span>
      <span className="mdc-button__label">Search For Recipe!</span>
    </button>
  );
};

export default RecipeSearchButton;
