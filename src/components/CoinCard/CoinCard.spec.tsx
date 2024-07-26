import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CoinCard from './CoinCard';
import { coinsApi } from '../../store';

jest.mock('../../store', () => {
  const originalModule = jest.requireActual('../../store');
  return {
    ...originalModule,
    coinsApi: {
      useGetCoinQuery: jest.fn(),
    },
  };
});

import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CoinCard', () => {
  beforeEach(() => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockClear();
  });

  test('renders loading state', () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <Router>
          <CoinCard />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  test('renders no data available', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Router>
          <CoinCard />
        </Router>
      </Provider>
    );

    expect(await screen.findByText('No data available')).toBeInTheDocument();
  });

  test('renders CoinCard with data', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          coin: {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: '30000',
            rank: '1',
            iconUrl: 'https://example.com/bitcoin-icon.png',
            change: '2.5',
            description: 'Bitcoin is a cryptocurrency.',
          },
        },
      },
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Router>
          <CoinCard />
        </Router>
      </Provider>
    );

    expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$30000.0000000')).toBeInTheDocument();
    expect(screen.getByText('Rank 1')).toBeInTheDocument();
    expect(screen.getByAltText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
    expect(
      screen.getByText('Bitcoin is a cryptocurrency.')
    ).toBeInTheDocument();
  });

  test('navigates back when close button is clicked', () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          coin: {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: '30000',
            rank: '1',
            iconUrl: 'https://example.com/bitcoin-icon.png',
            change: '2.5',
            description: 'Bitcoin is a cryptocurrency.',
          },
        },
      },
      isLoading: false,
    });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    render(
      <Provider store={store}>
        <Router>
          <CoinCard />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByAltText('close'));

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test('matches snapshot', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          coin: {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: '30000',
            rank: '1',
            iconUrl: 'https://example.com/bitcoin-icon.png',
            change: '2.5',
            description: 'Bitcoin is a cryptocurrency.',
          },
        },
      },
      isLoading: false,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CoinCard />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
