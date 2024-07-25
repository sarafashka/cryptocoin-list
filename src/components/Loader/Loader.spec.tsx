import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader Component', () => {
  test('renders without crashing', () => {
    render(<Loader role="loader" />);
    const loaderElement = screen.getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
