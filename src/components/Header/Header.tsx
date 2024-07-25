import React, { useContext } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import { ThemeContext } from '../../context/ThemeProvider';

const Header: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ExampleComponent must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  const isChecked = theme === 'dark';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <img src={logo} alt="logo" />
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
