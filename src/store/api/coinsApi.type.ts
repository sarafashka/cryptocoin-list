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

export interface CoinsData {
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

export interface CoinDetailed {
  status: string;
  data: {
    coin: CoinDetailedInfo;
  };
}

export interface CoinDetailedInfo {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: [
    {
      name: string;
      url: string;
      type: string;
    },
  ];
  supply: {
    confirmed: boolean;
    supplyAt: number;
    circulating: string;
    total: string;
    max: string;
  };
  '24hVolume': string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  sparkline: string[];
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  coinrankingUrl: string;
  lowVolume: false;
  listedAt: number;
  notices: [
    {
      type: string;
      value: string;
    },
  ];
  contractAddresses: string[];
  tags: string[];
}
