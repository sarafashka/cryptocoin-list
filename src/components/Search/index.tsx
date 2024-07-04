import React, { ChangeEvent } from 'react';
import { getCoinsList } from '../../api/api';
import { Coin } from '../../types/types';
import SearchIcon from '../icons/SearchIcon';
import styles from './Search.module.scss';

const { search, search__input, search__submit } = styles;

type SearchState = {
  searchValue: string;
  isLoading: boolean;
};

type SearchProps = {
  updatedCoinsList: (loadedCoins: Coin[]) => void;
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
      this.props.updatedCoinsList(loadedCoinsList.data.coins);
    }
  }

  async loadCoinsList() {
    this.setState({ isLoading: true });
    const loadedCoinsList = await getCoinsList(this.state.searchValue);
    this.setState({ isLoading: false });

    if (loadedCoinsList) {
      this.props.updatedCoinsList(loadedCoinsList.data.coins);
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
          </div>
          <button type="submit" className={search__submit}>
            <SearchIcon />
          </button>
        </form>

        <div>
          {this.state.isLoading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default Search;
