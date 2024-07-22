import { Component, ErrorInfo } from 'react';
import ErrorIcon from '../icons/ErrorBoundaryIcon';
import styles from './ErrorBoundary.module.scss';
import { Props, State } from './ErrorBoundary.type';

const { errorBoundary, message, content } = styles;

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
