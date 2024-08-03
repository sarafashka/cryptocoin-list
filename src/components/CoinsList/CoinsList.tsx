import React from 'react';
import styles from './CoinsList.module.scss';
import Link from 'next/link';
import AppRoutes from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import Checkbox from '../Checkbox';
import {
  addSelectedCoin,
  removeSelectedCoin,
} from '../../store/slices/coinsSelectedSlice';
import { CoinTableProps } from './CoinsList.type';
import { useRouter } from 'next/router';

const { coin, coins, coin__name } = styles;

const CoinsList: React.FC<CoinTableProps> = ({ coinsList }) => {
  const router = useRouter();
  const { page, search } = router.query;

  const dispatch = useAppDispatch();
  const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);
  const coinsOnPage = useAppSelector((state) => state.coinsOnPage.coins);

  const handleCheckboxChange = (id: string) => {
    const isAlreadyChecked = selectedCoins.find((item) => item.uuid === id);
    if (isAlreadyChecked) {
      dispatch(removeSelectedCoin(id));
    } else {
      const checkedCoin = coinsOnPage.find((item) => item.uuid === id);
      if (checkedCoin) dispatch(addSelectedCoin(checkedCoin));
    }
  };

  const getHref = (id: string) => {
    return search
      ? `${AppRoutes.HOME}coin/${id}?page=${page}&search=${search}`
      : `${AppRoutes.HOME}coin/${id}?page=${page}`;
  };

  return (
    <>
      <div className={coins}>
        {coinsList.map((item) => (
          <div className={coin} key={item.uuid}>
            <Checkbox
              checked={!!selectedCoins.find((coin) => coin.uuid === item.uuid)}
              onChange={() => handleCheckboxChange(item.uuid)}
              id={`checkbox-${item.uuid}`}
            />
            <div className={coin__name}>
              <Link href={getHref(item.uuid)}>{item.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CoinsList;
