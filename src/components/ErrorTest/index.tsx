import React from 'react';
import styles from './ErrorTest.module.scss';

const { errorTest__button } = styles;

type ErrorTestProps = Record<string, never>;
type ErrorTestState = {
  throwError: boolean;
};

class ErrorTest extends React.Component<ErrorTestProps, ErrorTestState> {
  constructor(props: ErrorTestProps) {
    super(props);
    this.state = {
      throwError: false,
    };
  }
  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('This is a test error!');
    }
    return (
      <>
        <button className={errorTest__button} onClick={this.handleClick}>
          Crush app
        </button>
      </>
    );
  }
}

export default ErrorTest;
