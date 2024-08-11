import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoinDetailed, CoinsData } from './coinsApi.type';
import { COINS_LIMIT } from '../../constants/constants';
import { API_KEY, endpoints } from '../../constants/endpoints';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-access-token', API_KEY);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getCoins: build.query<CoinsData, { page: number; searchQuery?: string }>({
      query: ({ page, searchQuery }) => {
        const coinsOffset = (page - 1) * COINS_LIMIT;
        const urlRequest = searchQuery
          ? `${endpoints.GET_COINS}?offset=${coinsOffset}&limit=${COINS_LIMIT}&search=${searchQuery}`
          : `${endpoints.GET_COINS}?offset=${coinsOffset}&limit=${COINS_LIMIT}`;
        return urlRequest;
      },
    }),
    getCoin: build.query<CoinDetailed, string>({
      query: (uuid) => `${endpoints.GET_COIN}/${uuid}`,
    }),
  }),
});

export const { getCoins, getCoin } = coinsApi.endpoints;
