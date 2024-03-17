import Select, { MultiValue } from 'react-select';

export type OptionType = {
  label: string;
  value: string;
};

export interface MultiSelectBarProps {
  isDisabled: boolean;
  options: MultiValue<OptionType>;
  selectedIngredients: MultiValue<OptionType>;
  handleSelectionChange: (newIngredients: MultiValue<OptionType>) => void;
}

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
