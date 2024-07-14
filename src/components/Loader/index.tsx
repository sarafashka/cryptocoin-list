import React from 'react';
import styles from './Loader.module.scss';

const { overlay, loader } = styles;

type LoaderProps = {
  role?: string;
};

const Loader: React.FC<LoaderProps> = ({ role }) => {
  return (
    <>
      <div className={overlay}>
        <div role={role} className={loader}></div>
      </div>
      ;
    </>
  );
};
export default Loader;
