import React from 'react';
import styles from './FlyoutMenu.module.scss';
const { menu, menu__title, menu__title_count, menu__unselect, menu__download } =
  styles;

type FlyoutMenuProps = {
  itemsNumber: number;
  unselect: () => void;
};

const FlyoutMenu: React.FC<FlyoutMenuProps> = ({ itemsNumber, unselect }) => {
  return (
    <div className={menu}>
      <div className={menu__title}>
        <span className={menu__title_count}>{itemsNumber}</span> items are
        selected
      </div>
      <button className={menu__unselect} onClick={unselect}>
        Unselect all
      </button>
      <button className={menu__download}>Download</button>
    </div>
  );
};

export default FlyoutMenu;
