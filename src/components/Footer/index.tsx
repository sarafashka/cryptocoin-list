import React from 'react';
import styles from './Footer.module.scss';

const { footer, footer__copyright } = styles;

const Footer: React.FC = () => {
  return (
    <>
      <footer className={footer}>
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
      </footer>
    </>
  );
};

export default Footer;
