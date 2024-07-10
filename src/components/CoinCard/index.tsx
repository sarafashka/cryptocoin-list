import React, { useEffect, useRef, useState } from 'react';
import cancelClose from '../../assets/svg/cross_cancel_icon.svg';
import styles from './CoinCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoin } from '../../api/api';
import { CoinDetailedInfo } from '../../types/types';
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
  // card__high,
  // card__low,
  card__close,
} = styles;

const CoinCard: React.FC = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<CoinDetailedInfo>();

  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (coinId) {
        setIsLoading(true);
        const coinData = await getCoin(coinId);
        if (coinData) setCoin(coinData.data.coin);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockRef.current &&
        !blockRef.current.contains(event.target as Node)
      ) {
        navigate(-1);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [navigate]);

  // const getNumberSparkline = () => {
  //   return coin?.sparkline
  //     .filter((item) => item !== null)
  //     .map((item) => Number(item));
  // };
  // const sparklineOfNumbers = sparkline
  //   .filter((item) => item !== null)
  //   .map((item) => Number(item));

  return (
    <>
      <div>{isLoading ? <Loader /> : ''}</div>
      <div className={card} ref={blockRef}>
        <div className={card__name}>{coin?.name}</div>
        <div className={card__symbol}>{coin?.symbol}</div>
        <div className={card__price}>$ {Number(coin?.price).toFixed(7)}</div>
        <div className={card__rank}>Rank {coin?.rank}</div>
        <div className={card__icon}>
          <img src={coin?.iconUrl} alt={coin?.name} width={50} height={50} />
        </div>
        <div className={card__change}>{coin?.change}%</div>
        {/* <div className={card__low}>
      <span>min </span>${Math.min(...getNumberSparkline()).toFixed(2)}
    </div>
    <div className={card__high}>
      <span>max </span>${Math.max(...sparklineOfNumbers()).toFixed(2)}
    </div> */}
        <div className={card__description}>{coin?.description}</div>
        <button
          className={card__close}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={cancelClose} alt="close" width={30} height={30} />
        </button>
      </div>
    </>
  );
};

export default CoinCard;
