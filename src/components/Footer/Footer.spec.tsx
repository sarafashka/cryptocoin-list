import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import { useAppSelector } from '../../hooks/reduxTypedHooks';

jest.mock('../../hooks/reduxTypedHooks');

const mockUseAppSelector = useAppSelector as jest.Mock;

global.URL.createObjectURL = jest.fn();

describe('Footer', () => {
  beforeEach(() => {
    mockUseAppSelector.mockClear();
  });

  test('renders link with the correct URL', () => {
    mockUseAppSelector.mockReturnValue([]);

    render(<Footer />);
    const linkElement = screen.getByText('sarafashka');
    expect(linkElement).toHaveAttribute(
      'href',
      'https://github.com/sarafashka'
    );
    fireEvent.click(linkElement);
    expect(linkElement.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/sarafashka'
    );
  });
});
