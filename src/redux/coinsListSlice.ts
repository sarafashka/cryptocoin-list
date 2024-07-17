import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CoinDetailedInfo } from '../types/types';

type Coins = {
  selectedCoins: string[];
  coinsOnThePage: CoinDetailedInfo[];
};

const initialState: Coins = {
  selectedCoins: [],
  coinsOnThePage: [],
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    addSelectedCoin(state, action: PayloadAction<string>) {
      state.selectedCoins.push(action.payload);
      console.log('add', state.selectedCoins);
    },
    removeSelectedCoin(state, action: PayloadAction<string>) {
      state.selectedCoins = state.selectedCoins.filter(
        (coin) => coin !== action.payload
      );
      console.log('remove', state.selectedCoins);
    },
    removeAllCoins(state) {
      state.selectedCoins = [];
    },
  },
});

export const { addSelectedCoin, removeSelectedCoin, removeAllCoins } =
  coinsSlice.actions;

export default coinsSlice.reducer;
