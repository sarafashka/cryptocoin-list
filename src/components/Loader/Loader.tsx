import React from 'react';
import styles from './Loader.module.scss';
import { LoaderProps } from './Loader.type';

const { overlay, loader } = styles;

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
