import React from 'react';
import { downloadCSV } from '../../utils/downloadCSV';
import styles from './FlyoutMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { removeAllCoins } from '../../store/slices/coinsSelectedSlice';
const { menu, menu__title, menu__title_count, menu__unselect, menu__download } =
  styles;

const FlyoutMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCoins = useAppSelector((state) => state.coinsSelected.coins);
  const itemsCount = selectedCoins.length;

  const removeAllChecked = () => {
    dispatch(removeAllCoins());
  };

  return (
    <div className={menu}>
      <div className={menu__title}>
        <span className={menu__title_count}>{itemsCount}</span> items are
        selected
      </div>
      <button className={menu__unselect} onClick={removeAllChecked}>
        Unselect all
      </button>
      <button
        className={menu__download}
        onClick={() =>
          downloadCSV(selectedCoins, `${itemsCount} crypto coins list.csv`)
        }
      >
        Download
      </button>
    </div>
  );
};

export default FlyoutMenu;
