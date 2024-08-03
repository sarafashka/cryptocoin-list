import Layout from '../layout';
import React from 'react';
import { wrapper } from '../../store/store';
import { CoinDetailed, CoinsData } from '../../store/api/coinsApi.type';
import CoinCard from '../../components/CoinCard';
import { coinsApi, getCoin, getCoins } from '../../store/api/coinsApi';
import { COINS_INITIAL_PAGE } from '../../constants/constants';

const Coin = (props: { coin: CoinDetailed; coins: CoinsData }) => {
  return (
    <Layout data={props.coins}>
      <CoinCard coin={props.coin} />
    </Layout>
  );
};
export default Coin;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search, id } = context.query;
    const pageNumber =
      typeof page === 'string'
        ? parseInt(page, 10)
        : Number(COINS_INITIAL_PAGE);
    const searchQuery = typeof search === 'string' ? search : '';
    const idCoin = typeof id === 'string' ? id : '';
    const data = await store.dispatch(
      getCoins.initiate({
        page: pageNumber || Number(COINS_INITIAL_PAGE),
        searchQuery: searchQuery || '',
      })
    );
    const coinData = await store.dispatch(getCoin.initiate(idCoin));

    await Promise.all(store.dispatch(coinsApi.util.getRunningQueriesThunk()));
    return {
      props: {
        coin: coinData.data,
        coins: data.data,
      },
    };
  }
);
