import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

// Todo: use an api to load options?
const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

const MultiSelectBar = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default MultiSelectBar;
