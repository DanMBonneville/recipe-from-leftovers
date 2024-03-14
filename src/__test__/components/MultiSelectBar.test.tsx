import { render, screen } from '@testing-library/react';
import MultiSelectBar from '../../components/MultiSelectBar';

describe('<MultiSelectBar />', () => {
  it('Select Bar is initially empty', () => {
    const handleSelectionChange = jest.fn();
    render(
      <MultiSelectBar
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
