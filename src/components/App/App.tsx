import React, { useState } from 'react';
import { Coin } from '../../types/types';
import CoinTable from '../CoinTable';
import Search from '../Search';
import Footer from '../Footer';
import styles from './App.module.scss';

const { app, main } = styles;

const App: React.FC = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);

  const updateCoinsList = (loadedCoins: Coin[]) => {
    setCoinList(loadedCoins);
  };

  return (
    <>
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
