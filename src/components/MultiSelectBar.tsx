import Select from 'react-select';
import { MultiSelectBarProps } from '../common/types';

const MultiSelectBar = (props: MultiSelectBarProps) => {
  const { isDisabled, options, selectedIngredients, handleSelectionChange } =
    props;

  return (
    <Select
      aria-label="Select Ingredients"
      className="multi-ingredient-select"
      isMulti
      isDisabled={isDisabled}
      value={selectedIngredients}
      options={options}
      onChange={handleSelectionChange}
    />
  );
};

export default MultiSelectBar;
