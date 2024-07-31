import styles from './CoinsPage.module.scss';
import React, { useState } from 'react';
import Search from '../Search';
import Footer from '../Footer';
// import Loader from '../Loader';
import CoinsList from '../CoinsList';
import FlyoutMenu from '../FlyoutMenu';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import Header from '../Header';
import { CoinsData } from '../../store/api/coinsApi.type';
import { useRouter } from 'next/router';
import Pagination from '../Pagination';
import { getTotalPagesNumber } from '../../utils/getTotalPagesNumber ';
import { COINS_LIMIT } from '../../constants/constants';

const { app, main, coins, aside } = styles;

type CoinsPageProps = {
  dataProps: CoinsData;
};

const CoinsPage: React.FC<CoinsPageProps> = ({ dataProps }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);

  console.log('ssr data', dataProps);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push({
      query: {
        ...router.query,
        page: newPage,
      },
    });
  };
  // const updateSearchRequest = (searchRequest: string) => {
  //   setSearchValue(searchRequest);
  // };

  return (
    <>
      <div className={`${app} container`}>
        <Header />
        <main className={main}>
          <aside className={aside}>
            <Search
              // updatedCoinsList={updateSearchRequest}
              isDisabled={false}
              // isDisabled={isLoading}
            ></Search>
            {/* <div>{isLoading ? <Loader role="loader" /> : ''}</div> */}
            <section className={coins}>
              <div>
                {dataProps && dataProps.data.coins.length > 0 ? (
                  <>
                    <CoinsList coinsList={dataProps.data.coins} />

                    <Pagination
                      currentPage={currentPage}
                      totalPages={getTotalPagesNumber(
                        dataProps.data.stats.total,
                        COINS_LIMIT
                      )}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div>Try another search query</div>
                )}
              </div>
            </section>
          </aside>
          <div></div>
          {selectedCoins.length > 0 && <FlyoutMenu />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CoinsPage;
