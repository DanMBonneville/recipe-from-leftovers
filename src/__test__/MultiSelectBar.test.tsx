import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import MultiSelectBar from '../components/MultiSelectBar';

describe('<MultiSelectBar />', () => {
  test('Initial State is empty', () => {
    const handleSelectionChange = jest.fn();
    render(
      <MultiSelectBar
        selected={[]}
        handleSelectionChange={handleSelectionChange}
      />
    );
    expect(screen.getByLabelText('Select')).toHaveValue([]);
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
