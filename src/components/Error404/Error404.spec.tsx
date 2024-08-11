import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error404 from './Error404';

describe('Error404 component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );
    expect(screen.getByRole('error404')).toMatchSnapshot();
  });
});
