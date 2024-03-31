import { RecipeSearchButtonProps, SelectBarProps } from '../../common/types';
import RecipeSearchButton from './RecipeSearchButton';
import SelectBar from './SelectBar';

const SelectSubmitIngredients = (
  props: SelectBarProps & RecipeSearchButtonProps
) => {
  return (
    <div className="select-submit-ingredients">
      <SelectBar {...props} />
      <RecipeSearchButton {...props} />
    </div>
  );
};

export default SelectSubmitIngredients;
