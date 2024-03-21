import { RecipeSearchButtonProps, SelectBarProps } from '../../common/types';
import RecipeSearchButton from './RecipeSearchButton';
import SelectBar from './SelectBar';

const SelectSubmitWrapper = (
  props: SelectBarProps & RecipeSearchButtonProps
) => {
  return (
    <div className="select-submit-wrapper">
      <SelectBar {...props} />
      <RecipeSearchButton {...props} />
    </div>
  );
};

export default SelectSubmitWrapper;
