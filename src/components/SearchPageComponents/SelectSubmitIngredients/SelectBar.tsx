import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SelectBarProps } from '../../../common/types';

const SelectBar = (props: SelectBarProps) => {
  const { isSelectDisabled, options, handleSelectionChange } = props;

  const checkIsMobile = () => window.matchMedia('(max-width: 768px)').matches;

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      fontSize: isMobile ? 'calc(100vw / 33)' : '16px',
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
    />
  );
};

export default SelectBar;
