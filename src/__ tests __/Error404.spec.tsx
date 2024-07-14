import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error404 from '../pages/Error404/Error404';

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
