import { useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { AppState } from '../store';

export type OptionType = {
  label: string;
  value: string;
};

export interface MultiSelectBarProps {
  selectedIngredients: MultiValue<OptionType>;
  handleSelectionChange: (newIngredients: MultiValue<OptionType>) => void;
}

const MultiSelectBar = (props: MultiSelectBarProps) => {
  const { selectedIngredients, handleSelectionChange } = props;
  let isFecthingIngredientOptions = useSelector(
    (state: AppState) => state.ingredient.isFecthingIngredientOptions
  );
  let ingredientOptions = useSelector(
    (state: AppState) => state.ingredient.ingredientOptions
  );

  return (
    <Select
      aria-label="Select Ingredients"
      className="multi-ingredient-select"
      isMulti
      isDisabled={isFecthingIngredientOptions}
      value={selectedIngredients}
      options={ingredientOptions}
      onChange={handleSelectionChange}
    />
  );
};

export default MultiSelectBar;
