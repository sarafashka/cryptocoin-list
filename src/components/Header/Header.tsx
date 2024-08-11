import React, { useContext } from 'react';
import styles from './Header.module.scss';
import logo from '../../../public/logo.svg';
import { ThemeContext } from '../../context/ThemeProvider';

const Header: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Must be used with Theme Provider');
  }

  const { theme, toggleTheme } = context;

  const isChecked = theme === 'dark';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <img src={logo.src} alt="logo" />
        </div>
        <div className={styles.header__title}>Cryptocoin Flare</div>
        <div className={styles.toggle}>
          <label className={styles.toggle__switch}>
            <input
              checked={isChecked}
              onChange={toggleTheme}
              type="checkbox"
              className={styles.toggle__checkbox}
              role="checkbox"
            />
            <span className={styles.toggle__slider}></span>
          </label>
        </div>
      </header>
    </>
  );
};

export default Header;
