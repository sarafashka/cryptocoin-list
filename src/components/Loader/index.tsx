import React from 'react';
import styles from './Loader.module.scss';

const { overlay, loader } = styles;
class Loader extends React.Component {
  render() {
    return (
      <>
        <div className={overlay}>
          <div className={loader}></div>
        </div>
        ;
      </>
    );
  }
}
export default Loader;
