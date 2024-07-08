import React, { ChangeEvent } from 'react';
import { getCoinsList } from '../../api/api';
import { CoinsList } from '../../types/types';
import SearchIcon from '../icons/SearchIcon';
import styles from './Search.module.scss';
import Loader from '../Loader';

const { search, search__input, search__submit } = styles;

type SearchState = {
  searchValue: string;
  isLoading: boolean;
};

type SearchProps = {
  updatedCoinsList: (loadedCoins: CoinsList) => void;
};

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: this.getSearchValue(),
      isLoading: false,
    };
  }

  getSearchValue() {
    return localStorage.getItem('searchValue') || '';
  }

  componentDidMount() {
    this.state.searchValue
      ? this.loadCoinsList()
      : this.loadCoinsListFirstTime();
  }

  async loadCoinsListFirstTime() {
    this.setState({ isLoading: true });
    const loadedCoinsList = await getCoinsList();
    this.setState({ isLoading: false });

    if (loadedCoinsList) {
      this.props.updatedCoinsList(loadedCoinsList);
    }
  }

  async loadCoinsList() {
    this.setState({ isLoading: true });
    const loadedCoinsList = await getCoinsList(this.state.searchValue);
    this.setState({ isLoading: false });

    if (loadedCoinsList) {
      this.props.updatedCoinsList(loadedCoinsList);
    }

    localStorage.setItem('searchValue', this.state.searchValue);
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.loadCoinsList();
  };

  render() {
    return (
      <>
        <div>{this.state.isLoading ? <Loader /> : ''}</div>
        <form onSubmit={this.handleSubmit}>
          <div className={search}>
            <input
              id="search"
              type="text"
              value={this.state.searchValue}
              className={search__input}
              onChange={this.handleChange}
              placeholder="Search..."
              autoComplete="off"
              disabled={this.state.isLoading}
            />
            <button type="submit" className={search__submit}>
              <SearchIcon />
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default Search;
