import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

jest.mock('./ErrorBoundaryIcon', () => () => <div>Mocked ErrorIcon</div>);

describe('ErrorBoundary Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('renders error message and icon when there is an error', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('errorBoundary')).toBeInTheDocument();
    expect(
      screen.getByText('Seems like an error occurred. Go to the main page')
    ).toBeInTheDocument();
    expect(screen.getByText('Mocked ErrorIcon')).toBeInTheDocument();
  });

  test('calls componentDidCatch when an error occurs', () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ThrowErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
