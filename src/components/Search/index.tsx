import React, { ChangeEvent } from 'react';
import { getCoinsList } from '../../api/api';
import './Search.module.scss';
import { Coin } from '../../types/types';

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
        <form className="search" onSubmit={this.handleSubmit}>
          <label htmlFor="search">
            <input
              id="search"
              type="text"
              value={this.state.searchValue}
              className="search__input"
              onChange={this.handleChange}
              placeholder="Search..."
              autoComplete="off"
              disabled={this.state.isLoading}
            />
          </label>
          <button type="submit" className="search__submit"></button>
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
