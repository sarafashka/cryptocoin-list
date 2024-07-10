import styles from './CoinsPage.module.scss';
import React, { useEffect, useState } from 'react';
import { CoinsData } from '../../types/types';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { COINS_LIMIT } from '../../constants/constants';
import { getCoinsList } from '../../api/api';
import Loader from '../../components/Loader';
import CoinsList from '../../components/CoinsList';

const { app, main, coins, aside } = styles;

const CoinsPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);

  const page = parseInt(searchParams.get('page') || '1', 10);

  const [coinsData, setCoinsData] = useState<CoinsData>();
  const [isLoading, setIsLoading] = useState(false);

  const coinsList = coinsData?.data.coins;

  useEffect(() => {
    const fetchData = async () => {
      const savedSearch = localStorage.getItem('searchCoin');
      await loadCoinsList(savedSearch);
    };
    fetchData();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const loadCoinsList = async (searchRequest?: string | null) => {
    setIsLoading(true);
    const loadedCoins = searchRequest
      ? await getCoinsList(page, searchRequest)
      : await getCoinsList(page);
    setIsLoading(false);

    if (loadedCoins) setCoinsData(loadedCoins);
    console.log('page', page);
    console.log('loaded', loadedCoins);
    if (searchRequest) localStorage.setItem('searchCoin', searchRequest);
  };

  const handleClick = () => {
    console.log('left panel', location);
  };

  return (
    <>
      <div className={app}>
        <main className={main}>
          <aside className={aside} onClick={handleClick}>
            <Search
              updatedCoinsList={loadCoinsList}
              isDisabled={isLoading}
            ></Search>
            <div>{isLoading ? <Loader /> : ''}</div>
            <section className={coins}>
              <div>
                {coinsList && coinsList?.length > 0 ? (
                  <>
                    <CoinsList coinsList={coinsList} />
                    <Pagination
                      currentPage={page}
                      totalPages={
                        coinsData?.data.stats.total
                          ? Math.ceil(coinsData?.data.stats.total / COINS_LIMIT)
                          : 0
                      }
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div>Try another search query</div>
                )}
              </div>
            </section>
          </aside>
          <div>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CoinsPage;
