import { fireEvent, render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const onPageChangeMock = jest.fn();

  it('renders previous button disabled on first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
  });
  it('renders next button disabled on last page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with currentPage - 1 when clicking previous button', () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const previousButton = getByText('Previous');
    fireEvent.click(previousButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when clicking next button', () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('displays current page number and total pages correctly', () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const currentPageText = getByText('3 of 5');
    expect(currentPageText).toBeInTheDocument();
  });
});
