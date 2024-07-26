import { selectCoinsSelected } from '../selectors/selectors';
import { RootState } from '../store';

describe('redux selectors', () => {
  const mockState: RootState = {
    coinsSelected: {
      coins: [
        { id: 1, name: 'Bitcoin' },
        { id: 2, name: 'Ethereum' },
      ],
    },
    coinsOnPage: { coins: [{ id: 1, name: 'Bitcoin' }] },
  };
  it('should select coins from state object', () => {
    const result = selectCoinsSelected(mockState);
    expect(result).toEqual({
      coins: [
        { id: 1, name: 'Bitcoin' },
        { id: 2, name: 'Ethereum' },
      ],
    });
  });
});
