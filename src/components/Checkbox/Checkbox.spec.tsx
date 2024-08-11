import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('renders correctly with unchecked state', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).not.toBeChecked();
  });

  test('renders correctly with checked state', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeChecked();
  });

  test('calls onChange with true when checked', () => {
    const onChange = jest.fn();
    render(<Checkbox checked={false} onChange={onChange} />);
    const checkboxInput = screen.getByRole('checkbox');
    fireEvent.click(checkboxInput);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('calls onChange with false when unchecked', () => {
    const onChange = jest.fn();
    render(<Checkbox checked={true} onChange={onChange} />);
    const checkboxInput = screen.getByRole('checkbox');
    fireEvent.click(checkboxInput);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Checkbox checked={false} onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
