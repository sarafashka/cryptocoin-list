import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../src/pages/404';

jest.mock('../src/components/Error404', () => () => (
  <div>Error 404: Page Not Found</div>
));

describe('Error Page', () => {
  test('renders Error404 component', () => {
    render(<Error />);
    expect(screen.getByText('Error 404: Page Not Found')).toBeInTheDocument();
  });
});
