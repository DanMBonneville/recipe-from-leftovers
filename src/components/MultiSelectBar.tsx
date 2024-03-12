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
  const initialSelection: Option[] = [];
  const [selected, setSelected] = useState(initialSelection);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelected([]);
  }, []);

  const handleSelectionChange = (ingredientOptions: Option[]) => {
    const selectionArray = ingredientOptions.map(
      (ingredient) => ingredient.value
    );
    setSelected(ingredientOptions);
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
