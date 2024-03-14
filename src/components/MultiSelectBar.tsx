import Select, { MultiValue } from 'react-select';

// TODO: get options in a different way
const ingredientsToSelect: ingredientType[] = [
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
];

export interface MultiSelectBarProps {
  selectedIngredients: MultiValue<ingredientType>;
  handleSelectionChange: (newIngredients: MultiValue<ingredientType>) => void;
}

export type ingredientType = {
  label: string;
  value: string;
};

export interface MultiSelectBarProps {
  selectedIngredients: MultiValue<ingredientType>;
  handleSelectionChange: (newIngredients: MultiValue<ingredientType>) => void;
}

const MultiSelectBar = (props: MultiSelectBarProps) => {
  const { selectedIngredients, handleSelectionChange } = props;

  return (
    <Select
      className="multi-ingredient-select"
      options={ingredientsToSelect}
      isMulti
      value={selectedIngredients}
      onChange={handleSelectionChange}
    />
  );
};

export default MultiSelectBar;
