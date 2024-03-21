import Select from 'react-select';
import { SelectBarProps } from '../../common/types';

const SelectBar = (props: SelectBarProps) => {
  const { isSelectDisabled, options, handleSelectionChange } = props;

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px solid #ccc',
      display: 'flex',
      label: 'asdfasdfasdf',
    }),
  };

  return (
    <Select
      aria-label="Select Ingredients"
      options={options}
      value={null}
      placeholder={"What's in your fridge?"}
      isDisabled={isSelectDisabled}
      styles={customStyles}
      isClearable={true}
      onChange={handleSelectionChange}
    />
  );
};

export default SelectBar;
