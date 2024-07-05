import React from 'react';
import styles from './Loader.module.scss';

const { overlay, loader } = styles;
const Loader: React.FC = () => {
  return (
    <>
      <div className={overlay}>
        <div className={loader}></div>
      </div>
      ;
    </>
  );
};
export default Loader;
