import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CoinCard from './CoinCard';
import { coinsApi } from '../../store';
import { CoinDetailed, CoinDetailedInfo } from '../../store/api/coinsApi.type';
import { useRouter } from 'next/router';

jest.mock('../../store', () => {
  const originalModule = jest.requireActual('../../store');
  return {
    ...originalModule,
    coinsApi: {
      useGetCoinQuery: jest.fn(),
    },
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CoinCard', () => {
  const mockCoin: Partial<CoinDetailedInfo> = {
    data: {
      coin: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '30000',
        rank: 1,
        iconUrl: 'https://example.com/bitcoin-icon.png',
        change: '2.5',
        description: 'Bitcoin is a cryptocurrency.',
      },
    },
  };

  const emptyCoin: Partial<CoinDetailedInfo> = {
    data: null,
  };

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
        <CoinCard coin={emptyCoin as CoinDetailed} />
      </Provider>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders no data available', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CoinCard coin={emptyCoin as CoinDetailed} />
      </Provider>
    );

    expect(await screen.findByText('No data available')).toBeInTheDocument();
  });

  test('renders CoinCard with data', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: mockCoin,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CoinCard coin={mockCoin as CoinDetailed} />
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
      data: mockCoin,
      isLoading: false,
    });

    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });

    render(
      <Provider store={store}>
        <CoinCard coin={mockCoin as CoinDetailed} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('close'));

    expect(mockBack).toHaveBeenCalled();
  });

  test('matches snapshot', async () => {
    (coinsApi.useGetCoinQuery as jest.Mock).mockReturnValue({
      data: mockCoin,
      isLoading: false,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <CoinCard coin={mockCoin as CoinDetailed} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
