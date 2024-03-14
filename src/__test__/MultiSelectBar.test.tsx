import { render, screen } from '@testing-library/react';
import MultiSelectBar from '../components/MultiSelectBar';

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

  //   test('somethin else', () => {
  //     const handleSelectionChange = jest.fn();
  //     const { queryByText } = render(
  //       <MultiSelectBar
  //         selected={[]}
  //         handleSelectionChange={handleSelectionChange}
  //       />
  //     );

  //     const button = queryByText;
  //     fireEvent.select();

  //     expect(handleSelectionChange).toHaveBeenCalledTimes(1);
  //   });
});
