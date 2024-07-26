import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, ThemeContext } from './ThemeProvider';

const TestComponent: React.FC = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('TestComponent must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('provides theme context value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  test('toggles theme on button click', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');

    fireEvent.click(button);
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  test('applies theme to document body', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(document.body.className).toBe('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.body.className).toBe('light');
  });
});
