import React from 'react';
import { Coin } from '../../types/types';
import styles from './CoinsList.module.scss';
import { Link, useLocation } from 'react-router-dom';
import AppRoutes from '../../constants/routes';

const { coins, coins__name } = styles;

type CoinTableProps = {
  coinsList: Coin[];
};

const CoinsList: React.FC<CoinTableProps> = ({ coinsList }) => {
  const location = useLocation();

  const pageNumber = new URLSearchParams(location.search).get('page') || '1';
  return (
    <>
      <div className={coins}>
        {coinsList.map((coin) => (
          <div key={coin.uuid} className={coins__name}>
            <Link to={`${AppRoutes.HOME}coins/${coin.uuid}?page=${pageNumber}`}>
              {coin.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default CoinsList;
