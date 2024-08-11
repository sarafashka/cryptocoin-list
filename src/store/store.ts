import { configureStore } from '@reduxjs/toolkit';
import coinsSelectedReducer from './slices/coinsSelectedSlice';
import coinsOnPageReducer from './slices/coinsOnPageSlice';
import { coinsApi } from './api/coinsApi';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    coinsSelected: coinsSelectedReducer,
    coinsOnPage: coinsOnPageReducer,
    [coinsApi.reducerPath]: coinsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

const makeStore: MakeStore<AppStore> = () => store;

export const wrapper = createWrapper(makeStore);
