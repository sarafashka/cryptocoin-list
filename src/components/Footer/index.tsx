import React from 'react';
import ErrorTest from '../ErrorTest';
import styles from './Footer.module.scss';

const { footer, footer__copyright } = styles;

class Footer extends React.Component {
  handleError = () => {};
  render() {
    return (
      <>
        <section className={footer}>
          <div className={footer__copyright}>
            <div>
              ©<span>{new Date().getFullYear()}</span>
            </div>
            <a
              href="https://github.com/sarafashka"
              target="_blank"
              rel="noopener noreferrer"
            >
              sarafashka
            </a>
          </div>
          <ErrorTest />
        </section>
      </>
    );
  }
}

export default Footer;
