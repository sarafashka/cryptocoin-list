import React from 'react';
import ErrorTest from '../ErrorTest';

class Footer extends React.Component {
  handleError = () => {};
  render() {
    return (
      <>
        <section>
          <ErrorTest />
        </section>
      </>
    );
  }
}

export default Footer;
