import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoinsData } from '../types/types';
import { COINS_LIMIT } from '../constants/constants';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinranking.com/v2' }),
  endpoints: (build) => ({
    getCoins: build.query<CoinsData, { page: number; searchQuery?: string }>({
      query: ({ page }) =>
        `/coins?offset=${(page - 1) * COINS_LIMIT}&limit=${COINS_LIMIT}`,
    }),
  }),
});
