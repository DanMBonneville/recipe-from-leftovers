import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { setIngredients } from '../store/reducers/ingredientReducer';

// TODO: get options in a different way

interface Option {
  label: string;
  value: string;
  disabled: boolean;
}

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry' },
];

const MultiSelectBar = () => {
  const initialSelection: Option[] = [];
  const [selected, setSelected] = useState(initialSelection);
  const dispatch = useDispatch();

  const handleSelectionChange = (ingredientOptions: Option[]) => {
    setSelected(ingredientOptions);
    let selectionArray = ingredientOptions.map(
      (ingredient) => ingredient.value
    );
    console.log('the selected array ', selectionArray);
    dispatch(setIngredients(selectionArray));
  };

  return (
    <MultiSelect
      className="multi-ingredient-select"
      options={options}
      value={selected}
      onChange={handleSelectionChange}
      labelledBy="Select"
    />
  );
};

export default MultiSelectBar;
