import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../src/pages/layout';
import { CoinsData } from '../src/store/api/coinsApi.type';

// Mock components used inside Layout
jest.mock('../src/components/Header/Header', () => () => <div>Header</div>);
jest.mock(
  '../src/components/CoinsPage/CoinsPage',
  () => (props: { dataProps: CoinsData }) => (
    <div>CoinsPage: {props.dataProps.data.stats.total} coins</div>
  )
);
jest.mock('../src/components/Footer/Footer', () => () => <div>Footer</div>);

const mockCoinsData: CoinsData = {
  data: {
    coins: [
      {
        uuid: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        color: '#f7931a',
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
        symbol: 'ETH',
        color: '#3c3c3d',
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
    ],
    stats: {
      total: 2,
      totalCoins: 0,
      totalMarkets: 0,
      totalExchanges: 0,
      totalMarketCap: '',
      total24hVolume: '',
    },
  },
  status: '',
};

describe('Layout Component', () => {
  it('renders the Layout with Head, Header, CoinsPage, Footer', () => {
    render(<Layout data={mockCoinsData} />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('CoinsPage: 2 coins')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('passes the correct data to CoinsPage', () => {
    render(<Layout data={mockCoinsData} />);

    expect(screen.getByText('CoinsPage: 2 coins')).toBeInTheDocument();
  });
});
