import React, { useContext } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import { ThemeContext } from '../../context/ThemeProvider';

const {
  header,
  header__logo,
  header__title,
  toggle,
  toggle__switch,
  toggle__checkbox,
  toggle__slider,
} = styles;

const Header: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ExampleComponent must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  const isChecked = theme === 'dark';

  return (
    <>
      <header className={header}>
        <div className={header__logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={header__title}>Cryptocoin Flare</div>
        <div className={toggle}>
          <label className={toggle__switch}>
            <input
              checked={isChecked}
              onChange={toggleTheme}
              type="checkbox"
              className={toggle__checkbox}
            />
            <span className={toggle__slider}></span>
          </label>
        </div>
      </header>
    </>
  );
};

export default Header;
