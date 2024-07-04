import React from 'react';
import { Coin } from '../../types/types';
import CoinTable from '../CoinTable';
import Search from '../Search';
import Footer from '../Footer';

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

  updateCoinsList = (loadedCoins: Coin[]) => {
    this.setState({ coinList: loadedCoins });
  };

  render() {
    return (
      <>
        <Search updatedCoinsList={this.updateCoinsList}></Search>
        <div>
          {this.state.coinList.length !== 0 ? (
            <CoinTable coinList={this.state.coinList} />
          ) : (
            'Use the search to find crypto coins'
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
