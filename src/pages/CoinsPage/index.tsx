import React, { useState } from 'react';
import { CoinsList } from '../../types/types';
import CoinTable from '../../components/CoinTable';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './CoinsPage.module.scss';
import Pagination from '../../components/Pagination';
import { COINS_LIMIT } from '../../constants/constants';

const { app, main, coins, coins__list } = styles;

const CoinsPage: React.FC = () => {
  const [coinList, setCoinList] = useState<CoinsList>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const updateCoinsList = (loadedCoins: CoinsList) => {
    setCoinList(loadedCoins);
    console.log('loaded coins', loadedCoins);
  };
  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };
  return (
    <>
      <div className={app}>
        <main className={main}>
          <Search updatedCoinsList={updateCoinsList}></Search>
          <section className={coins}>
            <div className={coins__list}>
              {coinList && <CoinTable coinList={coinList.data.coins} />}
              <Pagination
                currentPage={page}
                totalPages={
                  coinList?.data.stats.totalCoins
                    ? Math.ceil(coinList?.data.stats.totalCoins / COINS_LIMIT)
                    : 0
                }
                onPageChange={handlePageChange}
              />
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
