import React from 'react';
import styles from './Footer.module.scss';

const { footer, footer__copyright } = styles;

const Footer: React.FC = () => {
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
      </section>
    </>
  );
};

export default Footer;
