import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo.png';

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
  return (
    <>
      <header className={header}>
        <div className={header__logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={header__title}>Cryptocoin Flare</div>
        <div className={toggle}>
          <label className={toggle__switch}>
            <input type="checkbox" className={toggle__checkbox} />
            <span className={toggle__slider}></span>
          </label>
        </div>
      </header>
    </>
  );
};

export default Header;
