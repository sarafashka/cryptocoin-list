import Layout from './layout';
import React from 'react';
import { getCoins, coinsApi } from '../store/api/coinsApi';
import { wrapper } from '../store/store';
import { CoinsData } from '../store/api/coinsApi.type';

export default function Home(data: {
  coins: {
    data: CoinsData;
  };
}) {
  const newData = data.coins.data;
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;
    const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
    const searchQuery = typeof search === 'string' ? search : '';
    const data = await store.dispatch(
      getCoins.initiate({
        page: pageNumber || 1,
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
