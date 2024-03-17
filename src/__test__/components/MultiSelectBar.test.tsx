import { render, screen } from '@testing-library/react';
import { MultiValue } from 'react-select';
import MultiSelectBar, { OptionType } from '../../components/MultiSelectBar';

describe('<MultiSelectBar />', () => {
  it('Select Bar is initially empty', () => {
    const handleSelectionChange = jest.fn();
    const options: MultiValue<OptionType> = [
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
