import React from 'react';
import styles from './comingSoon.module.css';

const ComingSoon = ({ navigate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.subtitle}>
          The R & E feature is currently under active development. Stay tuned for updates!
        </p>
        <button className={styles.backBtn} onClick={() => navigate('landing')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
