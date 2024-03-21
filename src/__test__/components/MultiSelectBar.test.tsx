import { render, screen } from '@testing-library/react';
import { IngredientOptionType } from '../../common/types';
import SelectBar from '../../components/SelectBar';

describe('<MultiSelectBar />', () => {
  it('Select Bar is initially empty', () => {
    const handleSelectionChange = jest.fn();
    const options: IngredientOptionType[] = [
      {
        label: 'testLabel',
        value: 'testValue',
      },
    ];
    render(
      <SelectBar
        isDisabled={false}
        options={options}
        handleSelectionChange={handleSelectionChange}
      />
    );
    expect(screen.getByLabelText('Select Ingredients')).toHaveAttribute(
      'value',
      ''
    );
  });
});
