import { render } from '@testing-library/react';
import MultiSelectBar from '../components/MultiSelectBar';

test('Initial State is empty', () => {
  const { container } = render(<MultiSelectBar />);
  // TODO: move state to container of multi select
  //   expect(container.value).toBe([]);
});
