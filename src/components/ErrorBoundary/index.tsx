import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorIcon from '../icons/ErrorBoundaryIcon';
import styles from './ErrorBoundary.module.scss';
import React from 'react';

const { errorBoundary, message, content } = styles;

type Props = {
  children?: ReactNode;
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={errorBoundary} role="errorBoundary">
          <ErrorIcon />
          <div className={message}>
            <p className={content}>
              Seems like an error occurred. Go to the main page
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
