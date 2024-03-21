import { render, screen } from '@testing-library/react';
import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../../common/types';
import MultiSelectBar from '../../components/SelectBar';

describe('<MultiSelectBar />', () => {
  it('Select Bar is initially empty', () => {
    const handleSelectionChange = jest.fn();
    const option: SingleValue<IngredientOptionType> = {
      label: 'testLabel',
      value: 'testValue',
    };
    const options: SingleValue<IngredientOptionType>[] = [
      {
        label: 'testLabel',
        value: 'testValue',
      },
    ];
    render(
      <MultiSelectBar
        isDisabled={false}
        options={options}
        selectedIngredient={option}
        handleSelectionChange={handleSelectionChange}
      />
    );
    expect(screen.getByLabelText('Select Ingredients')).toHaveAttribute(
      'value',
      ''
    );
  });
});
