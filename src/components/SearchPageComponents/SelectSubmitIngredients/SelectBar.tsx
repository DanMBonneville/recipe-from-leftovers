import React from 'react';
import Select from 'react-select';
import { SelectBarProps } from '../../../common/types';

const SelectBar = (props: SelectBarProps) => {
  const { isSelectDisabled, options, handleSelectionChange } = props;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      overflow: 'hidden',
    }),
    container: (provided: any) => ({
      ...provided,
      width: isMobile ? '88%' : '56%',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      display: 'inline-block',
      whiteSpace: 'nowrap',
      fontSize: isMobile ? 'calc(100vw / 33)' : '20px',
    }),
  };

  return (
    <Select
      aria-label="Select Ingredients"
      styles={customStyles}
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
