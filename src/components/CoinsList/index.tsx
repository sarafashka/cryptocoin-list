import React from 'react';
import { Coin } from '../../types/types';
import styles from './CoinsList.module.scss';
import { Link, useLocation } from 'react-router-dom';
import AppRoutes from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import Checkbox from '../Checkbox';
import {
  addSelectedCoin,
  removeAllCoins,
  removeSelectedCoin,
} from '../../redux/coinsListSlice';
import FlyoutMenu from '../FlyoutMenu';

const { coin, coins, coin__name } = styles;

type CoinTableProps = {
  coinsList: Coin[];
};

const CoinsList: React.FC<CoinTableProps> = ({ coinsList }) => {
  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get('page') || '1';

  const dispatch = useAppDispatch();
  const selectedCoins = useAppSelector((state) => state.coins.selectedCoins);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    selectedCoins.includes(id)
      ? dispatch(removeSelectedCoin(id))
      : dispatch(addSelectedCoin(id));
  };

  const removeAllChecked = () => {
    dispatch(removeAllCoins());
  };

  return (
    <>
      <div className={coins}>
        {coinsList.map((item) => (
          <div className={coin} key={item.uuid}>
            <Checkbox
              checked={selectedCoins.includes(item.uuid)}
              onChange={(checked) => handleCheckboxChange(item.uuid, checked)}
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
