import React, { useEffect, useRef } from 'react';
// import { CoinDetailed } from '../../types/types';
import cancelClose from '../../assets/svg/cross_cancel_icon.svg';
import styles from './CoinCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import { getCoin } from '../../api/api';
import AppRoutes from '../../constants/routes';

const {
  card,
  // card__icon,
  // card__description,
  // card__change,
  // card__high,
  // card__low,
  card__close,
} = styles;

const CoinCard: React.FC = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);
  // const [coin, setCoin] = useState<CoinDetailed | null>(null);

  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockRef.current &&
        !blockRef.current.contains(event.target as Node)
      ) {
        navigate(AppRoutes.HOME);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  // const getCoinDetailed = async () => {
  //   setIsLoading(true);
  //   const testUuid = 'Qwsogvtv82FCd';
  //   const coinDetailed = await getCoin(testUuid);
  //   setCoin(coinDetailed);
  //   setIsLoading(false);
  //   console.log('coin', coinDetailed);
  // };

  return (
    <div className={card} ref={blockRef}>
      <div>bitcoin</div>
      <div>{coinId}</div>
      <button
        className={card__close}
        onClick={() => {
          navigate(AppRoutes.HOME);
        }}
      >
        <img src={cancelClose} alt="close" width={30} height={30} />
      </button>
    </div>
  );
  // const { description, change, sparkline, iconUrl, name } = coin.data.coin;
  // const sparklineOfNumbers = sparkline
  //   .filter((item) => item !== null)
  //   .map((item) => Number(item));
  // return (
  //   <div className={card}>
  //     <div className={card__icon}>
  //       <img src={iconUrl} alt={name} width={50} height={50} />
  //     </div>
  //     <div className={card__change}>{change}%</div>
  //     <div className={card__low}>
  //       <span>min </span>${Math.min(...sparklineOfNumbers).toFixed(2)}
  //     </div>
  //     <div className={card__high}>
  //       <span>max </span>${Math.max(...sparklineOfNumbers).toFixed(2)}
  //     </div>
  //     <div className={card__description}>{description}</div>
  //     <button className={card__close}>
  //       <img src={cancelClose} alt="close" width={30} height={30} />
  //     </button>
  //   </div>
  // );
};

export default CoinCard;
