import React from 'react';
import styles from './landing.module.css';

const Landing = ({ navigate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Army Demand System</h1>
        <p className={styles.subtitle}>Indian Army Rations & Agriculture Portal</p>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.cardBtn} ${styles.demandBtn}`}
            onClick={() => navigate('demandSelection')}
          >
            <div className={styles.btnContent}>
              <h2>Demand</h2>
              <p>Initiate or track farmer supply requirements</p>
            </div>
          </button>

          <button
            className={`${styles.cardBtn} ${styles.reBtn}`}
            onClick={() => navigate('comingSoon')}
          >
            <div className={styles.btnContent}>
              <h2>R & E</h2>
              <p>Manage dry rations, gear, and unit equipment</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
