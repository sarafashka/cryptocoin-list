import React from 'react';
import './CoinTable.module.scss';

interface CoinTableProps {}

class CoinTable extends React.Component<CoinTableProps> {
  constructor(props: CoinTableProps) {
    super(props);
  }

  render() {
    // const { title, poster_path, vote_average } = this.props;
    return (
      <>
        <div className="coin-list">coin</div>
      </>
    );
  }
}
export default CoinTable;
