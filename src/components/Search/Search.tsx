import React, { ChangeEvent, useState } from 'react';
import SearchIcon from '../icons/SearchIcon';
import styles from './Search.module.scss';
import { SEARCH_VALUE_IN_LOCAL_STORAGE } from '../../constants/constants';
import { SearchProps } from './Search.type';

const { search, search__input, search__submit } = styles;

const Search: React.FC<SearchProps> = ({ updatedCoinsList, isDisabled }) => {
  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem(SEARCH_VALUE_IN_LOCAL_STORAGE) || '';
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updatedCoinsList(inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <div className={search}>
          <input
            id="search"
            type="text"
            value={inputValue}
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
