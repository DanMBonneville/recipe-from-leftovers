import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { RecipeSearchButtonProps } from '../common/types';

const RecipeSearchButton = (props: RecipeSearchButtonProps) => {
  const { isDisabled, handleSearchForRecipes } = props;
  return (
    <Button
      data-testid="recipe-search-button"
      disabled={isDisabled}
      onClick={() => handleSearchForRecipes()}
      size="large"
      variant="contained"
    >
      <Icon>search</Icon>
    </Button>
  );
};

export default RecipeSearchButton;
