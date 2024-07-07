import { CoinDetailed, CoinsList } from '../types/types';

const API_KEY = 'coinranking0e7711dc12205d9e181b6035e9e3c7503e649b8200b5117c';
const BASE_URL = 'https://api.coinranking.com/v2';
const GET_COINS = '/coins';
const GET_COIN = '/coin';

const COINS_OFFSET = 0;
const COINS_LIMIT = 10;

const options = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': API_KEY,
  },
};

export const getCoinsList = async (searchQuery?: string) => {
  let data: null | CoinsList = null;
  const urlRequest = searchQuery
    ? `${BASE_URL}${GET_COINS}?offset=${COINS_OFFSET}&limit=${COINS_LIMIT}&search=${searchQuery}`
    : `${BASE_URL}${GET_COINS}?offset=${COINS_OFFSET}&limit=${COINS_LIMIT}`;
  try {
    const response = await fetch(urlRequest, options);
    data = await response.json();
  } catch (error) {
    console.log('No loading data', error);
  }
  return data;
};

export const getCoin = async (uuid: string) => {
  let data: null | CoinDetailed = null;
  const urlRequest = `${BASE_URL}${GET_COIN}/${uuid}`;
  try {
    const response = await fetch(urlRequest, options);
    data = await response.json();
  } catch (error) {
    console.log('No data for coin', error);
  }
  return data;
};
