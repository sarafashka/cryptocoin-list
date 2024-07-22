import { RootState } from '../store';

export const selectCoinsSelected = (state: RootState) => state.coinsSelected;

export const selectCoinsOnPage = (state: RootState) => state.coinsOnPage;
