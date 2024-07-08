import React, { useState } from 'react';
import { Coin } from '../../types/types';
import CoinTable from '../../components/CoinTable';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import styles from './CoinsPage.module.scss';

const { app, main, coins, coins__list } = styles;

const CoinsPage: React.FC = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const updateCoinsList = (loadedCoins: Coin[]) => {
    setCoinList(loadedCoins);
  };
  return (
    <>
      <div className={app}>
        <main className={main}>
          <Search updatedCoinsList={updateCoinsList}></Search>
          <section className={coins}>
            <div className={coins__list}>
              {coinList.length !== 0 ? (
                <CoinTable coinList={coinList} />
              ) : (
                'Use the search to find crypto coins'
              )}
            </div>
            <div>
              <Outlet />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CoinsPage;
