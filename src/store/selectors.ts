import { RootState } from './store';

export const selectCountries = (state: RootState) => state.countries;

export const formAnswers = (state: RootState) => state.formAnswers;
