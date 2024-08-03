import styles from './CoinsPage.module.scss';
import React, { useEffect, useState } from 'react';
import Search from '../Search';
import CoinsList from '../CoinsList';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { CoinsData } from '../../store/api/coinsApi.type';
import { useRouter } from 'next/router';
import Pagination from '../Pagination';
import { getTotalPagesNumber } from '../../utils/getTotalPagesNumber ';
import { COINS_INITIAL_PAGE, COINS_LIMIT } from '../../constants/constants';
import { setCoinsFromPage } from '../../store/slices/coinsOnPageSlice';

const { main, coins, aside } = styles;

type CoinsPageProps = {
  dataProps: CoinsData;
};

const CoinsPage: React.FC<CoinsPageProps> = ({ dataProps }) => {
  const router = useRouter();
  const { page } = router.query;
  const pageString = typeof page === 'string' ? page : COINS_INITIAL_PAGE;
  const [currentPage, setCurrentPage] = useState(pageString);
  const dispatch = useAppDispatch();
  // const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);

  useEffect(() => {
    if (dataProps) {
      dispatch(setCoinsFromPage(dataProps.data.coins));
    }
  }, [dataProps, dispatch]);

  useEffect(() => {
    if (!page) {
      handlePageChange(Number(COINS_INITIAL_PAGE));
    }
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(String(newPage));
    router.push({
      query: {
        ...router.query,
        page: String(newPage),
      },
    });
  };
  const updateSearchRequest = (searchRequest: string) => {
    setCurrentPage(COINS_INITIAL_PAGE);
    router.push({
      query: {
        ...router.query,
        search: searchRequest,
        page: COINS_INITIAL_PAGE,
      },
    });
  };

  return (
    <>
      <div>
        <main className={main}>
          <aside className={aside}>
            <Search
              updatedCoinsList={updateSearchRequest}
              isDisabled={false}
            ></Search>
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
          {/* {selectedCoins.length > 0 && <FlyoutMenu />} */}
        </main>
      </div>
    </>
  );
};

export default CoinsPage;
