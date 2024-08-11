import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { ThemeContext } from '../../context/ThemeProvider';

describe('Header', () => {
  const renderWithContext = (
    theme: 'light' | 'dark',
    toggleTheme: () => void
  ) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Header />
      </ThemeContext.Provider>
    );
  };

  test('renders logo', () => {
    renderWithContext('light', jest.fn());
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders title', () => {
    renderWithContext('light', jest.fn());
    const title = screen.getByText('Cryptocoin Flare');
    expect(title).toBeInTheDocument();
  });

  test('toggle is checked when theme is dark', () => {
    renderWithContext('dark', jest.fn());
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('toggle is not checked when theme is light', () => {
    renderWithContext('light', jest.fn());
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls toggleTheme when checkbox is clicked', () => {
    const toggleTheme = jest.fn();
    renderWithContext('light', toggleTheme);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('throws error if used without ThemeProvider', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<Header />)).toThrow(
      'Must be used with Theme Provider'
    );

    consoleErrorSpy.mockRestore();
  });
});
