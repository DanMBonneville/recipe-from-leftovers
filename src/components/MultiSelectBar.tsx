import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { setIngredients } from '../store/reducers/ingredientReducer';

interface Option {
  label: string;
  value: string;
  disabled: boolean;
}

// TODO: get options in a different way
const ingredientsToSelect = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry' },
];

const MultiSelectBar = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelectionChange = (ingredientOptions: Option[]) => {
    setSelected(ingredientOptions);
    const selectionArray = ingredientOptions.map(
      (ingredient) => ingredient.value
    );
    dispatch(setIngredients(selectionArray));
  };

  return (
    <MultiSelect
      className="multi-ingredient-select"
      options={ingredientsToSelect}
      value={selected}
      onChange={handleSelectionChange}
      labelledBy="Select"
    />
  );
};

export default MultiSelectBar;
