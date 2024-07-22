import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

describe('Search Component', () => {
  const mockUpdatedCoinsList = jest.fn();

  beforeEach(() => {
    mockUpdatedCoinsList.mockClear();
  });

  it('update the search input', () => {
    render(
      <Search updatedCoinsList={mockUpdatedCoinsList} isDisabled={false} />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Bitcoin' } });

    expect(searchInput).toHaveValue('Bitcoin');
  });

  it('call function when submit', () => {
    render(
      <Search updatedCoinsList={mockUpdatedCoinsList} isDisabled={false} />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Bitcoin' } });

    const searchForm = screen.getByRole('form');
    fireEvent.submit(searchForm);

    expect(mockUpdatedCoinsList).toHaveBeenCalledWith('Bitcoin');
  });

  it('disable the search input', () => {
    render(
      <Search updatedCoinsList={mockUpdatedCoinsList} isDisabled={true} />
    );

    const searchInput = screen.getByPlaceholderText('Search...');

    expect(searchInput).toBeDisabled();
  });
});
