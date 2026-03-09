import React from 'react';
import styles from './landing.module.css';

const DemandSelection = ({ navigate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button
          className={styles.backBtn}
          onClick={() => navigate('landing')}
          style={{ marginBottom: '2rem', display: 'inline-block' }}
        >
          &larr; Back to Portals
        </button>
        <h1 className={styles.title}>Indent Operations</h1>
        <p className={styles.subtitle}>Select an operation to continue</p>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.cardBtn} ${styles.demandBtn}`}
            style={{ borderColor: '#658234' }}
            onClick={() => navigate('delSupForm')}
          >
            <div className={styles.btnContent}>
              <h2 style={{ color: '#2e4521' }}>Demand & Supply</h2>
              <p style={{ color: '#4b5320' }}>Farmer-to-Unit Delivery Indent</p>
            </div>
          </button>

          <button
            className={`${styles.cardBtn} ${styles.reBtn}`}
            // We use the class styles for background now
            onClick={() => navigate('adminPanel')}
          >
            <div className={styles.btnContent}>
              <h2>HQ Command Center</h2>
              <p>HQ Dashboard & Analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandSelection;
