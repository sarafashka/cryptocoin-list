import React from 'react';
import styles from './FlyoutMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { removeAllCoins } from '../../store/slices/coinsSelectedSlice';
import { downloadedCSV } from '../../utils/downloadedCSV';
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
      <button className={menu__download}>
        <a
          href={downloadedCSV(selectedCoins)}
          download={`${itemsCount} crypto coins list.csv`}
        >
          Download
        </a>
      </button>
    </div>
  );
};

export default FlyoutMenu;
