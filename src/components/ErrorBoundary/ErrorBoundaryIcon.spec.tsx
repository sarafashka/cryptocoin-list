import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorIcon from './ErrorBoundaryIcon';

describe('ErrorIcon Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<ErrorIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
