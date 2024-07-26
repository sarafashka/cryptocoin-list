import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';

test('link opens the correct URL', () => {
  render(<Footer />);
  const linkElement = screen.getByText('sarafashka');
  expect(linkElement).toHaveAttribute('href', 'https://github.com/sarafashka');
  fireEvent.click(linkElement);
  expect(linkElement.closest('a')).toHaveAttribute(
    'href',
    'https://github.com/sarafashka'
  );
});
