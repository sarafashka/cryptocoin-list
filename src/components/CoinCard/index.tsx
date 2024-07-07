import React from 'react';
import { CoinDetailed } from '../../types/types';
import cancelClose from '../../assets/svg/cross_cancel_icon.svg';
import styles from './CoinCard.module.scss';

const {
  card,
  card__icon,
  card__description,
  card__change,
  card__high,
  card__low,
  card__close,
} = styles;

type CoinProps = {
  coin: CoinDetailed;
};

const CoinCard: React.FC<CoinProps> = ({ coin }) => {
  const { description, change, sparkline, iconUrl, name } = coin.data.coin;
  const sparklineOfNumbers = sparkline
    .filter((item) => item !== null)
    .map((item) => Number(item));

  return (
    <div className={card}>
      <div className={card__icon}>
        <img src={iconUrl} alt={name} width={50} height={50} />
      </div>
      <div className={card__change}>{change}%</div>
      <div className={card__low}>
        <span>min </span>${Math.min(...sparklineOfNumbers).toFixed(2)}
      </div>
      <div className={card__high}>
        <span>max </span>${Math.max(...sparklineOfNumbers).toFixed(2)}
      </div>
      <div className={card__description}>{description}</div>
      <button className={card__close}>
        <img src={cancelClose} alt="close" width={30} height={30} />
      </button>
    </div>
  );
};

export default CoinCard;
