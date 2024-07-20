import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Coin } from '../../types/types';

type Coins = {
  coins: Coin[];
};

const initialState: Coins = {
  coins: [],
};

const coinsOnPageSlice = createSlice({
  name: 'coinsOnPage',
  initialState,
  reducers: {
    setCoinsFromPage(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },
  },
});

export const { setCoinsFromPage } = coinsOnPageSlice.actions;

export default coinsOnPageSlice.reducer;
