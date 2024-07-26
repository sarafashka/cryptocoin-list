import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

type CoinsData = {
  coins: { uuid: string; name: string; symbol: string }[];
  stats: { total: number };
};

type BaseQueryResponse = {
  data?: { data: CoinsData };
  error?: string;
  meta?: unknown;
};

const baseQuery: BaseQueryFn<unknown, unknown, string> = async () => {
  return {
    data: {
      data: { coins: [], stats: { total: 0 } },
    } as unknown as BaseQueryResponse,
    error: undefined,
    meta: {},
  };
};

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery,
  endpoints: () => ({}),
});
