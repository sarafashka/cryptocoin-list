import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { coinsApi, store } from '../../store';
import CoinsPage from './CoinsPage';
import { ThemeProvider } from '../../context/ThemeProvider';
import mockRouter from 'next-router-mock';
import { CoinsData } from '../../store/api/coinsApi.type';

jest.mock('../../store', () => {
  const originalModule = jest.requireActual('../../store');
  return {
    ...originalModule,
    coinsApi: {
      useGetCoinsQuery: jest.fn(),
    },
  };
});

jest.mock('next/router', () => require('next-router-mock'));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>
        <ThemeProvider>{ui}</ThemeProvider>
      </Router>
    </Provider>
  );
};

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

describe('CoinsPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/coins?page=1');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CoinsPage with data', async () => {
    (coinsApi.useGetCoinsQuery as jest.Mock).mockReturnValue({
      data: mockCoinsData,
      isLoading: false,
    });

    renderWithProviders(<CoinsPage dataProps={mockCoinsData} />);

    expect(screen.queryByRole('loader')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
    });
  });

  test('renders CoinsPage with no data', async () => {
    (coinsApi.useGetCoinsQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          coins: [],
          stats: { total: 0 },
        },
      },
      isLoading: false,
    });

    renderWithProviders(
      <CoinsPage
        dataProps={{
          data: {
            coins: [],
            stats: {
              total: 0,
              totalCoins: 0,
              totalMarkets: 0,
              totalExchanges: 0,
              totalMarketCap: '',
              total24hVolume: '',
            },
          },
        }}
      />
    );

    expect(screen.queryByRole('loader')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Try another search query')).toBeInTheDocument();
    });
  });

  test('matches snapshot', async () => {
    (coinsApi.useGetCoinsQuery as jest.Mock).mockReturnValue({
      data: mockCoinsData,
      isLoading: false,
    });

    const { asFragment } = renderWithProviders(
      <CoinsPage dataProps={mockCoinsData} />
    );
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
