import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Coin } from '../api/coinsApi.type';

type Coins = {
  coins: Coin[];
};

const initialState: Coins = {
  coins: [],
};

const coinsSelectedSlice = createSlice({
  name: 'coinsSelected',
  initialState,
  reducers: {
    addSelectedCoin(state, action: PayloadAction<Coin>) {
      state.coins.push(action.payload);
    },
    removeSelectedCoin(state, action: PayloadAction<string>) {
      state.coins = state.coins.filter((coin) => coin.uuid !== action.payload);
    },
    removeAllCoins(state) {
      state.coins = [];
    },
  },
});

export const { addSelectedCoin, removeSelectedCoin, removeAllCoins } =
  coinsSelectedSlice.actions;

export default coinsSelectedSlice.reducer;
