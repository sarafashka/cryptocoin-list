import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CoinsList from '../components/CoinsList/CoinsList';
import { Coin } from '../types/types';
import AppRoutes from '../constants/routes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?page=1',
  }),
}));

const mockCoinsList: Coin[] = [
  {
    uuid: '1',
    name: 'Bitcoin',
    symbol: '',
    color: '',
    iconUrl: '',
    marketCap: '',
    price: '',
    listedAt: 0,
    change: '',
    rank: '',
    sparkline: [],
    coinrankingUrl: '',
    '24hVolume': '',
    btcPrice: '',
    contractAddresses: [],
  },
  {
    uuid: '2',
    name: 'Ethereum',
    symbol: '',
    color: '',
    iconUrl: '',
    marketCap: '',
    price: '',
    listedAt: 0,
    change: '',
    rank: '',
    sparkline: [],
    coinrankingUrl: '',
    '24hVolume': '',
    btcPrice: '',
    contractAddresses: [],
  },
  {
    uuid: '3',
    name: 'Ripple',
    symbol: '',
    color: '',
    iconUrl: '',
    marketCap: '',
    price: '',
    listedAt: 0,
    change: '',
    rank: '',
    sparkline: [],
    coinrankingUrl: '',
    '24hVolume': '',
    btcPrice: '',
    contractAddresses: [],
  },
];

describe('CoinsList Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <CoinsList coinsList={mockCoinsList} />
      </Router>
    );
  });

  test('renders the relevant card data', () => {
    mockCoinsList.forEach((coin) => {
      expect(screen.getByText(coin.name)).toBeInTheDocument();
    });
  });

  test('clicking on a card opens a detailed card component', () => {
    const bitcoinLink = screen.getByText('Bitcoin').closest('a');
    expect(bitcoinLink).toHaveAttribute(
      'href',
      `${AppRoutes.HOME}coins/1?page=1`
    );

    if (bitcoinLink) {
      fireEvent.click(bitcoinLink);
    }
  });
  test('renders the specified number of cards', () => {
    const cards = screen.getAllByText(/Bitcoin|Ethereum|Ripple/);
    expect(cards).toHaveLength(mockCoinsList.length);
  });
});
