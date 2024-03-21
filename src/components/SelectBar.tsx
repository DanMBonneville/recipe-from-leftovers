import Select from 'react-select';
import { SelectBarProps } from '../common/types';

const SelectBar = (props: SelectBarProps) => {
  const { isDisabled, options, selectedIngredient, handleSelectionChange } =
    props;

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px solid #ccc',
      color: state.isSelected ? 'white' : 'black',
      background: state.isSelected ? '#007bff' : 'white',
      display: 'flex',
      label: 'asdfasdfasdf',
    }),
    // placeholder: (provided: any) => ({
    //   ...provided,
    //   height: '100%',

    //         // text-size: "30px",
    //         display: "flex",
    //         align-items: "center",
    // }),

    multiValueLabel: (provided: any) => ({
      ...provided,
      // display: 'none',
    }),
    // multiValueRemove: (provided: any) => ({
    //   ...provided,
    //   // display: 'none',
    // }),
  };

  return (
    <Select
      aria-label="Select Ingredients"
      options={options}
      placeholder={"What's in your fridge?"}
      // value={selectedIngredient}
      isDisabled={isDisabled}
      styles={customStyles}
      // menuIsOpen
      onChange={handleSelectionChange}
    />
  );
};

export default SelectBar;
