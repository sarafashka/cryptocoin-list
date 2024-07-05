import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCoinsList } from '../../api/api';
import { Coin } from '../../types/types';
import SearchIcon from '../icons/SearchIcon';
import styles from './Search.module.scss';
import Loader from '../Loader';

const { search, search__input, search__submit } = styles;

type SearchProps = {
  updatedCoinsList: (loadedCoins: Coin[]) => void;
};

const Search: React.FC<SearchProps> = ({ updatedCoinsList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  useEffect(() => {
    searchValue ? loadCoinsList() : loadCoinsListFirstTime;
  });

  const loadCoinsListFirstTime = async () => {
    setIsLoading(true);
    const loadedCoinsList = await getCoinsList();
    setIsLoading(false);

    if (loadedCoinsList) {
      updatedCoinsList(loadedCoinsList.data.coins);
    }
  };

  const loadCoinsList = async () => {
    setIsLoading(true);
    const loadedCoinsList = await getCoinsList(searchValue);
    setIsLoading(false);

    if (loadedCoinsList) {
      updatedCoinsList(loadedCoinsList.data.coins);
    }

    localStorage.setItem('searchValue', searchValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadCoinsList();
  };

  return (
    <>
      <div>{isLoading ? <Loader /> : ''}</div>
      <form onSubmit={handleSubmit}>
        <div className={search}>
          <input
            id="search"
            type="text"
            value={searchValue}
            className={search__input}
            onChange={handleChange}
            placeholder="Search..."
            autoComplete="off"
            disabled={isLoading}
          />
          <button type="submit" className={search__submit}>
            <SearchIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
