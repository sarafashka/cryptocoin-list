import React from 'react';
import './App.css';
// import CoinTable from '../CoinTable';
import { getCoinsList } from '../../api/api';
import { Coin } from '../../types/types';
import CoinTable from '../CoinTable';

type AppProps = Record<string, never>;
type AppState = {
  isLoading: boolean;
  coinList: Coin[];
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { isLoading: false, coinList: [] };
  }

  // async componentDidMount() {
  //   const loadedData = await getCoinsList();
  //   this.setState({ coinList: loadedData.data.coins });
  // }
  getCoins = async () => {
    const loadedData = await getCoinsList();
    if (loadedData?.data.coins) {
      this.setState({ coinList: loadedData.data.coins });
    }
  };

  render() {
    return (
      <>
        <button onClick={this.getCoins}>get coins</button>
        <div className="movie__list">
          {this.state.coinList.length !== 0 ? (
            <CoinTable coinList={this.state.coinList} />
          ) : (
            'Use the search to find movie'
          )}
        </div>
      </>
    );
  }
}

export default App;
