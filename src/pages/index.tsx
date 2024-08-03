import Layout from './layout';
import React from 'react';
import { getCoins, coinsApi } from '../store/api/coinsApi';
import { wrapper } from '../store/store';
import { CoinsData } from '../store/api/coinsApi.type';
import { COINS_INITIAL_PAGE } from '../constants/constants';

export default function Home(props: {
  coins: {
    data: CoinsData;
  };
}) {
  const newData = props.coins.data;
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;
    const pageNumber =
      typeof page === 'string'
        ? parseInt(page, 10)
        : Number(COINS_INITIAL_PAGE);
    const searchQuery = typeof search === 'string' ? search : '';
    const data = await store.dispatch(
      getCoins.initiate({
        page: pageNumber || Number(COINS_INITIAL_PAGE),
        searchQuery: searchQuery || '',
      })
    );

    await Promise.all(store.dispatch(coinsApi.util.getRunningQueriesThunk()));
    return {
      props: {
        coins: data,
      },
    };
  }
);
