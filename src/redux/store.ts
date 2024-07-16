import { configureStore } from '@reduxjs/toolkit';

import { coinsApi } from './coinsApi';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
  // reducer: {
  //   coinsList: coinsListReducer,
  // },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
