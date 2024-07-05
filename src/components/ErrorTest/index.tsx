import React, { useState } from 'react';
import styles from './ErrorTest.module.scss';

const { errorTest__button } = styles;

const ErrorTest: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };
  if (throwError) {
    throw new Error('This is a test error!');
  }
  return (
    <>
      <button className={errorTest__button} onClick={handleClick}>
        Crush app
      </button>
    </>
  );
};

export default ErrorTest;
