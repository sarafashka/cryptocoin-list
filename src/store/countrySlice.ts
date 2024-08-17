import { createSlice } from '@reduxjs/toolkit';
import { listOfCountries } from '../constants/listOfCountries';

const initialState: string[] = listOfCountries;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});
export const countriesReducer = countriesSlice.reducer;
