import React, { useRef } from 'react';
import cancelClose from '../../assets/svg/cross_cancel_icon.svg';
import styles from './CoinCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { coinsApi } from '../../store';
import Loader from '../Loader';

const {
  card,
  card__name,
  card__rank,
  card__price,
  card__symbol,
  card__icon,
  card__description,
  card__change,
  card__close,
} = styles;

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
    <div className={card} ref={blockRef}>
      <div className={card__name}>{name}</div>
      <div className={card__symbol}>{symbol}</div>
      <div className={card__price}>${Number(price).toFixed(7)}</div>
      <div className={card__rank}>Rank {rank}</div>
      <div className={card__icon}>
        <img src={iconUrl} alt={name} width={50} height={50} />
      </div>
      <div className={card__change}>{change}%</div>
      <div className={card__description}>{description}</div>
      <button
        className={card__close}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={cancelClose} alt="close" width={30} height={30} />
      </button>
    </div>
  );
};

export default CoinCard;
