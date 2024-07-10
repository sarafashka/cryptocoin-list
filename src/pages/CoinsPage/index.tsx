import React, { useEffect, useState } from 'react';
import { CoinsList } from '../../types/types';
import CoinTable from '../../components/CoinTable';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import styles from './CoinsPage.module.scss';
import Pagination from '../../components/Pagination';
import { COINS_LIMIT } from '../../constants/constants';
import { getCoinsList } from '../../api/api';
import Loader from '../../components/Loader';

const { app, main, coins, coins__list } = styles;

const CoinsPage: React.FC = () => {
  const [coinsData, setCoinsData] = useState<CoinsList>();
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  // const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const coinsList = coinsData?.data.coins;

  useEffect(() => {
    const fetchData = async () => {
      const savedSearch = localStorage.getItem('searchCoin');
      await loadCoinsList(savedSearch);
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    // navigate(`/?page=${newPage}`);
    loadCoinsList(localStorage.getItem('searchCoin'));
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

  return (
    <>
      <div className={app}>
        <main className={main}>
          <Search
            updatedCoinsList={loadCoinsList}
            isDisabled={isLoading}
          ></Search>
          <div>{isLoading ? <Loader /> : ''}</div>
          <section className={coins}>
            <div className={coins__list}>
              {coinsList && coinsList?.length > 0 ? (
                <>
                  <CoinTable coinList={coinsList} />
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
