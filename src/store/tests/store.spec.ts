import '@testing-library/jest-dom';

import { store } from '../store';

describe('Redux Store', () => {
  test('should have initial state for coinsSelectedReducer', () => {
    const initialState = store.getState().coinsSelected;
    expect(initialState).toEqual({ coins: [] });
  });

  test('should have initial state for coinsOnPageReducer', () => {
    const initialState = store.getState().coinsOnPage;
    expect(initialState).toEqual({ coins: [] });
  });
});
