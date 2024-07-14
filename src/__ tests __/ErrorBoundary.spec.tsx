import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components//ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('render errorUI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <MockComponentThatThrowsError />
      </ErrorBoundary>
    );
    expect(screen.getByRole('errorBoundary')).toMatchSnapshot();
  });
});

const MockComponentThatThrowsError: React.FC = () => {
  throw new Error('Test error');
};
