import styles from './CoinsPage.module.scss';
import React from 'react';
import Search from '../Search';
import Footer from '../Footer';
// import Pagination from '../Pagination';
// import Loader from '../Loader';
import CoinsList from '../CoinsList';
import FlyoutMenu from '../FlyoutMenu';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import Header from '../Header';
// import { setCoinsFromPage } from '../../store/slices/coinsOnPageSlice';
// import { getTotalPagesNumber } from '../../utils/getTotalPagesNumber ';
// import { useRouter } from 'next/router';
import { CoinsData } from '../../store/api/coinsApi.type';

const { app, main, coins, aside } = styles;

type CoinsPageProps = {
  dataProps: CoinsData;
};

const CoinsPage: React.FC<CoinsPageProps> = ({ dataProps }) => {
  // const [searchValue, setSearchValue] = useLocalStorage(
  //   SEARCH_VALUE_IN_LOCAL_STORAGE,
  //   ''
  // );

  // const location = useLocation();
  // const [searchParams, setSearchParams] = useSearchParams(location.search);
  // const page = parseInt(searchParams.get('page') || '1', 10);

  // const router = useRouter();
  // console.log('as path', router.asPath)
  // console.log('basepath', router.basePath)

  const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);

  // const dispatch = useAppDispatch();
  // const { data, isLoading } = coinsApi.useGetCoinsQuery({
  //   page: 1,
  //   // page: page,
  //   searchQuery: searchValue,
  // });

  console.log('ssr data', dataProps);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setCoinsFromPage(data.data.coins));
  //   }
  // }, [data, dispatch]);

  // const handlePageChange = (newPage: number) => {
  //   setSearchParams({ page: newPage.toString() });
  // };

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
                {/* {data && data.data.coins.length > 0 ? ( */}
                <>
                  <CoinsList coinsList={dataProps.data.coins} />

                  {/* <Pagination
                      currentPage={page}
                      totalPages={getTotalPagesNumber(
                        data.data.stats.total,
                        COINS_LIMIT
                      )}
                      onPageChange={handlePageChange}
                    /> */}
                </>
                {/* ) : (
                  <div>Try another search query</div>
                )} */}
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
