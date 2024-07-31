import React, { useRef } from 'react';
import cancelClose from '../../../public/svg/cross_cancel_icon.svg';
// import cancelClose from '../../assets/svg/cross_cancel_icon.svg';
import styles from './CoinCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { coinsApi } from '../../store';
import Loader from '../Loader';

const CoinCard: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();

  const blockRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = coinsApi.useGetCoinQuery(coinId || '', {
    skip: !coinId,
  });

  if (isLoading) {
    return <Loader role="loader" />;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const { name, symbol, price, rank, iconUrl, change, description } =
    data.data.coin;

  return (
    <div className={styles.card} ref={blockRef}>
      <div className={styles.card__name}>{name}</div>
      <div className={styles.card__symbol}>{symbol}</div>
      <div className={styles.card__price}>${Number(price).toFixed(7)}</div>
      <div className={styles.card__rank}>Rank {rank}</div>
      <div className={styles.card__icon}>
        <img src={iconUrl} alt={name} width={50} height={50} />
      </div>
      <div className={styles.card__change}>{change}%</div>
      <div className={styles.card__description}>{description}</div>
      <button
        className={styles.card__close}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={cancelClose.src} alt="close" width={30} height={30} />
      </button>
    </div>
  );
};

export default CoinCard;
