import styles from './CoinsPage.module.scss';
import React from 'react';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import {
  COINS_LIMIT,
  SEARCH_VALUE_IN_LOCAL_STORAGE,
} from '../../constants/constants';
import Loader from '../../components/Loader';
import CoinsList from '../../components/CoinsList';
import { coinsApi } from '../../redux';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const { app, main, coins, aside } = styles;

const CoinsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useLocalStorage(
    SEARCH_VALUE_IN_LOCAL_STORAGE,
    ''
  );

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading } = coinsApi.useGetCoinsQuery({
    page: page,
    searchQuery: searchValue,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const updateSearchRequest = (searchRequest: string) => {
    setSearchValue(searchRequest);
  };

  return (
    <>
      <div className={app}>
        <main className={main}>
          <aside className={aside}>
            <Search
              updatedCoinsList={updateSearchRequest}
              isDisabled={isLoading}
            ></Search>
            <div>{isLoading ? <Loader role="loader" /> : ''}</div>
            <section className={coins}>
              <div>
                {data && data.data.coins.length > 0 ? (
                  <>
                    <CoinsList coinsList={data.data.coins} />

                    <Pagination
                      currentPage={page}
                      totalPages={
                        data.data.stats.total
                          ? Math.ceil(data.data.stats.total / COINS_LIMIT)
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
