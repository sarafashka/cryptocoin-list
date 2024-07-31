import React, { ChangeEvent, useState } from 'react';
import searchIcon from '../../../public/svg/magnifier-search.svg';
import styles from './Search.module.scss';
import { SearchProps } from './Search.type';
import { useRouter } from 'next/router';

const { search__block, search__input, search__submit } = styles;

const Search: React.FC<SearchProps> = ({ isDisabled }) => {
  const router = useRouter();
  const { search } = router.query;
  const [inputValue, setInputValue] = useState(search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (router.pathname === '/') {
      if (inputValue) {
        router.push({
          query: { page: '1', search: inputValue },
        });
      } else {
        router.push({
          query: { page: '1' },
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <div className={search__block}>
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
            <img src={searchIcon.src} alt="search" width={30} height={30} />
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
