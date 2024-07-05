import React from 'react';
import { Coin } from '../../types/types';
import CoinTable from '../CoinTable';
import Search from '../Search';
import Footer from '../Footer';
import styles from './App.module.scss';

const { app } = styles;

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
        <div className={app}>
          <main>
            <Search updatedCoinsList={this.updateCoinsList}></Search>
            <div>
              {this.state.coinList.length !== 0 ? (
                <CoinTable coinList={this.state.coinList} />
              ) : (
                'Use the search to find crypto coins'
              )}
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
