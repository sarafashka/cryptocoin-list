import React, { ChangeEvent, useState } from 'react';
import SearchIcon from '../icons/SearchIcon';
import styles from './Search.module.scss';

const { search, search__input, search__submit } = styles;

type SearchProps = {
  updatedCoinsList: (searchRequest?: string) => Promise<void>;
  isDisabled: boolean;
};

const Search: React.FC<SearchProps> = ({ updatedCoinsList, isDisabled }) => {
  const [searchValue, setSearchValue] = useState(() => {
    return localStorage.getItem('searchCoin') || '';
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updatedCoinsList(searchValue);
  };

  return (
    <>
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
            disabled={isDisabled}
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
