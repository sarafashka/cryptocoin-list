import React from 'react';
import { render, screen } from '@testing-library/react';
import CoinsPage from '../pages/CoinsPage';

describe('Card List component', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('the component renders the specified number of cards;', async () => {
    render(<CoinsPage />);
    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(10);
  });

  test.todo('if no cards are present appropriate message is displayed');
});
