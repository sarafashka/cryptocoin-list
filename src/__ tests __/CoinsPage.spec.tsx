import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CoinsPage from '../pages/CoinsPage';

const mockGetCoinsList = async () => {
  return {
    data: {
      coins: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
      ],
      stats: {
        total: 100,
      },
    },
  };
};

describe('CoinsPage component', () => {
  test('renders CoinsPage component with initial data', async () => {
    const originalGetCoinsList = jest.spyOn(
      require('../api/api'),
      'getCoinsList'
    );
    originalGetCoinsList.mockImplementation(mockGetCoinsList);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CoinsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText('Bitcoin')).toBeInTheDocument();
      expect(getByText('Ethereum')).toBeInTheDocument();
    });

    originalGetCoinsList.mockRestore();
  });
});
