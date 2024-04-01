import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { RecipeSearchButtonProps } from '../../../common/types';

const RecipeSearchButton = (props: RecipeSearchButtonProps) => {
  const { isButtonDisabled, handleSearchForRecipes } = props;
  return (
    <Button
      data-testid="recipe-search-button"
      disabled={isButtonDisabled}
      onClick={() => handleSearchForRecipes()}
      variant="contained"
    >
      <Icon>search</Icon>
    </Button>
  );
};

export default RecipeSearchButton;
