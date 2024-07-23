import React from 'react';
import styles from './CoinsList.module.scss';
import { Link, useLocation } from 'react-router-dom';
import AppRoutes from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import Checkbox from '../Checkbox';
import {
  addSelectedCoin,
  removeSelectedCoin,
} from '../../store/slices/coinsSelectedSlice';
import { CoinTableProps } from './CoinsList.type';

const { coin, coins, coin__name } = styles;

const CoinsList: React.FC<CoinTableProps> = ({ coinsList }) => {
  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get('page') || '1';

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

  return (
    <>
      <div className={coins}>
        {coinsList.map((item) => (
          <div className={coin} key={item.uuid}>
            <Checkbox
              checked={!!selectedCoins.find((coin) => coin.uuid === item.uuid)}
              onChange={() => handleCheckboxChange(item.uuid)}
            />
            <div className={coin__name}>
              <Link
                to={`${AppRoutes.HOME}coins/${item.uuid}?page=${pageNumber}`}
              >
                {item.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CoinsList;
