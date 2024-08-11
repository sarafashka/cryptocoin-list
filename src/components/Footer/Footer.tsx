import React from 'react';
import styles from './Footer.module.scss';
import FlyoutMenu from '../FlyoutMenu/FlyoutMenu';
import { useAppSelector } from '../../hooks/reduxTypedHooks';

const { footer, footer__copyright, footer__flyout } = styles;

const Footer: React.FC = () => {
  const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);

  return (
    <>
      <footer className={footer}>
        <div className={footer__copyright}>
          <div>
            ©<span>{new Date().getFullYear()}</span>
          </div>
          <a
            href="https://github.com/sarafashka"
            target="_blank"
            rel="noopener noreferrer"
          >
            sarafashka
          </a>
        </div>
        {selectedCoins.length > 0 && (
          <div className={footer__flyout}>
            <FlyoutMenu />
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
