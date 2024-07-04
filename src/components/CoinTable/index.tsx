import React from 'react';
import { Coin } from '../../types/types';
import styles from './CoinTable.module.scss';

const {
  coins,
  coins__table,
  coins__name,
  coins__symbol,
  coins__price,
  coins__volume,
  coins__rank,
} = styles;

type CoinTableProps = {
  coinList: Coin[];
};

class CoinTable extends React.Component<CoinTableProps> {
  constructor(props: CoinTableProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={coins}>
          <table className={coins__table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Volume (24H)</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {this.props.coinList.map((coin) => (
                <tr key={coin.uuid}>
                  <td className={coins__name}>{coin.name}</td>
                  <td className={coins__symbol}>{coin.symbol}</td>
                  <td className={coins__price}>
                    ${Number(coin.price).toFixed(2)}
                  </td>
                  <td className={coins__volume}>{coin['24hVolume']}</td>
                  <td className={coins__rank}>{coin.rank}</td>
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
