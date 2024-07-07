import React, { useState } from 'react';
import { Coin, CoinDetailed } from '../../types/types';
import CoinTable from '../CoinTable';
import Search from '../Search';
import Footer from '../Footer';
import styles from './App.module.scss';
import CoinCard from '../CoinCard';
import { getCoin } from '../../api/api';

const { app, main } = styles;

const App: React.FC = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [coin, setCoin] = useState<CoinDetailed | null>(null);

  const updateCoinsList = (loadedCoins: Coin[]) => {
    setCoinList(loadedCoins);
  };

  const getCoinDetailed = async () => {
    const testUuid = 'Qwsogvtv82FCd';
    const coinDetailed = await getCoin(testUuid);
    setCoin(coinDetailed);
    console.log('coin', coinDetailed);
  };

  return (
    <>
      <button onClick={getCoinDetailed}>Open Coin</button>
      <div className={app}>
        <main className={main}>
          <Search updatedCoinsList={updateCoinsList}></Search>
          <div>
            {coinList.length !== 0 ? (
              <CoinTable coinList={coinList} />
            ) : (
              'Use the search to find crypto coins'
            )}
          </div>
          {coin && <CoinCard coin={coin} />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
