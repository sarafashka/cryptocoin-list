import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { coinsApi, store } from '../../store';
import CoinsPage from './CoinsPage';
import { ThemeProvider } from '../../context/ThemeProvider';

jest.mock('../../store', () => {
  const originalModule = jest.requireActual('../../store');
  return {
    ...originalModule,
    coinsApi: {
      useGetCoinsQuery: jest.fn(),
    },
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>
        <ThemeProvider>{ui}</ThemeProvider>
      </Router>
    </Provider>
  );
};

describe('CoinsPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CoinsPage with data', async () => {
    (coinsApi.useGetCoinsQuery as jest.Mock).mockReturnValue({
      data: {
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
          stats: { total: 2 },
        },
      },
      isLoading: false,
    });

    renderWithProviders(<CoinsPage />);

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

    renderWithProviders(<CoinsPage />);

    expect(screen.queryByRole('loader')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Try another search query')).toBeInTheDocument();
    });
  });

  test('matches snapshot', async () => {
    (coinsApi.useGetCoinsQuery as jest.Mock).mockReturnValue({
      data: {
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
          stats: { total: 2 },
        },
      },
      isLoading: false,
    });

    const { asFragment } = renderWithProviders(<CoinsPage />);
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
