import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coinsListSlice';
import { coinsApi } from './coinsApi';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    [coinsApi.reducerPath]: coinsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
