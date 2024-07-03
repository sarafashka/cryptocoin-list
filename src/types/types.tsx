export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  change: string;
  rank: string;
  sparkline: string[];
  coinrankingUrl: string;
  '24hVolume': string;
  btcPrice: string;
  contractAddresses: string[];
}

export interface CoinsList {
  status: string;
  data: {
    stats: {
      total: number;
      totalCoins: number;
      totalMarkets: number;
      totalExchanges: number;
      totalMarketCap: string;
      total24hVolume: string;
    };
    coins: Coin[];
  };
}
