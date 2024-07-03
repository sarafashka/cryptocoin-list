import React from 'react';
import './CoinTable.module.scss';
import { Coin } from '../../types/types';

interface CoinTableProps {
  coinList: Coin[];
}

class CoinTable extends React.Component<CoinTableProps> {
  constructor(props: CoinTableProps) {
    super(props);
  }

  render() {
    // const { title, poster_path, vote_average } = this.props;
    return (
      <>
        <div className="coin-list">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Price</th>
                <th>24H Volume</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {this.props.coinList.map((coin) => (
                <tr key={coin.uuid}>
                  <td>
                    <img
                      src={coin.iconUrl}
                      alt={coin.name}
                      width="30"
                      height="30"
                    />
                  </td>
                  <td>{coin.name}</td>
                  <td>{coin.price}</td>
                  <td>{coin['24hVolume']}</td>
                  <td>{coin.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default CoinTable;
