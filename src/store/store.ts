import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './slices/countrySlice';
import { formAnswersReducer } from './slices/formAnswersSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formAnswers: formAnswersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
