import { render, screen } from '@testing-library/react';
import { MultiValue } from 'react-select';
import { IngredientTypes } from '../../common/types';
import MultiSelectBar from '../../components/MultiSelectBar';

describe('<MultiSelectBar />', () => {
  it('Select Bar is initially empty', () => {
    const handleSelectionChange = jest.fn();
    const options: MultiValue<IngredientTypes> = [
      {
        label: 'testLabel',
        value: 'testValue',
      },
    ];
    render(
      <MultiSelectBar
        isDisabled={false}
        options={options}
        selectedIngredients={[]}
        handleSelectionChange={handleSelectionChange}
      />
    );
    expect(screen.getByLabelText('Select Ingredients')).toHaveAttribute(
      'value',
      ''
    );
  });
});
