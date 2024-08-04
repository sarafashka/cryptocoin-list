import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CoinsList from './CoinsList';
import {
  addSelectedCoin,
  removeSelectedCoin,
} from '../../store/slices/coinsSelectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { useRouter } from 'next/router';
import { Coin } from '../../store/api/coinsApi.type';

jest.mock('../../hooks/reduxTypedHooks');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

const coinsList: Coin[] = [
  {
    uuid: '1',
    symbol: 'BTC',
    color: '#f7931a',
    name: 'Bitcoin',
    iconUrl: 'https://example.com/bitcoin-icon.png',
    marketCap: '600000000000',
    price: '30000',
    listedAt: 1234567890,
    change: '2.5',
    rank: '1',
    sparkline: ['30000', '31000', '32000'],
    coinrankingUrl: 'https://example.com/bitcoin',
    '24hVolume': '2000000000',
    btcPrice: '60000',
    contractAddresses: [],
  },
  {
    uuid: '2',
    symbol: 'ETH',
    color: '#3c3c3d',
    name: 'Ethereum',
    iconUrl: 'https://example.com/ethereum-icon.png',
    marketCap: '200000000000',
    price: '2000',
    listedAt: 1234567890,
    change: '1.5',
    rank: '2',
    sparkline: ['2000', '2100', '2200'],
    coinrankingUrl: 'https://example.com/ethereum',
    '24hVolume': '1000000000',
    btcPrice: '4000',
    contractAddresses: [],
  },
];

describe('CoinsList', () => {
  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selectorFn) =>
      selectorFn({
        coinsSelected: { coins: [] },
        coinsOnPage: { coins: coinsList },
      })
    );
    mockUseRouter.mockReturnValue({
      query: { page: '1', search: '' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders coins list with checkboxes and links', () => {
    render(
      <Provider store={store}>
        <CoinsList coinsList={coinsList} />
      </Provider>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();

    const bitcoinCheckbox = screen.getByTestId('checkbox-1');
    const ethereumCheckbox = screen.getByTestId('checkbox-2');

    expect(bitcoinCheckbox).not.toBeChecked();
    expect(ethereumCheckbox).not.toBeChecked();

    const bitcoinLink = screen.getByText('Bitcoin').closest('a');
    const ethereumLink = screen.getByText('Ethereum').closest('a');

    expect(bitcoinLink).toHaveAttribute('href', '/coin/1?page=1');
    expect(ethereumLink).toHaveAttribute('href', '/coin/2?page=1');
  });

  test('dispatches addSelectedCoin when checkbox is checked', () => {
    mockUseAppSelector.mockImplementation((selectorFn) =>
      selectorFn({
        coinsSelected: { coins: [] },
        coinsOnPage: { coins: coinsList },
      })
    );

    render(
      <Provider store={store}>
        <CoinsList coinsList={coinsList} />
      </Provider>
    );

    const ethereumCheckbox = screen.getByTestId('checkbox-2');
    fireEvent.click(ethereumCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith(addSelectedCoin(coinsList[1]));
  });

  test('dispatches removeSelectedCoin when checkbox is unchecked', () => {
    mockUseAppSelector.mockImplementation((selectorFn) =>
      selectorFn({
        coinsSelected: { coins: [coinsList[0]] },
        coinsOnPage: { coins: coinsList },
      })
    );

    render(
      <Provider store={store}>
        <CoinsList coinsList={coinsList} />
      </Provider>
    );

    const bitcoinCheckbox = screen.getByTestId('checkbox-1');
    fireEvent.click(bitcoinCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith(removeSelectedCoin('1'));
  });
});
