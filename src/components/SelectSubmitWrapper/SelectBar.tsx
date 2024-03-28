import Select from 'react-select';
import { SelectBarProps } from '../../common/types';

const SelectBar = (props: SelectBarProps) => {
  const { isSelectDisabled, options, handleSelectionChange } = props;

  return (
    <Select
      aria-label="Select Ingredients"
      options={options}
      value={null}
      placeholder={"What's in your fridge?"}
      isDisabled={isSelectDisabled}
      isClearable={true}
      onChange={handleSelectionChange}
      // menuIsOpen
    />
  );
};

export default SelectBar;
