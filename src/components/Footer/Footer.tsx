import React from 'react';
import styles from './Footer.module.scss';
import RsLogo from '../RsLogo/RsLogo';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles['rs-logo']}>
          <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
            <RsLogo />
          </a>
        </div>
        <div>
          <ul className={styles['author-links']}>
            <li className={styles['author-links__item']}>
              <a href="https://github.com/a-bodrova" target="_blank" rel="noreferrer">
                a-bodrova
              </a>
            </li>
            <li className={styles['author-links__item']}>
              <a href="https://github.com/nos64" target="_blank" rel="noreferrer">
                nos64
              </a>
            </li>
            <li className={styles['author-links__item']}>
              <a href="https://github.com/JelbyDev" target="_blank" rel="noreferrer">
                JelbyDev
              </a>
            </li>
          </ul>
        </div>
        <div>© 2022</div>
      </div>
    </footer>
  );
};

export default Footer;
