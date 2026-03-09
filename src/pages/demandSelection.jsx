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
        <h1 className={styles.title}>Demand Operations</h1>
        <p className={styles.subtitle}>Select an operation to continue</p>
        
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.cardBtn} ${styles.demandBtn}`}
            style={{ borderColor: '#3b82f6', backgroundColor: '#eff6ff' }}
            onClick={() => navigate('delSupForm')}
          >
            <div className={styles.btnContent}>
              <h2 style={{ color: '#1d4ed8' }}>Del/Sup</h2>
              <p style={{ color: '#3b82f6' }}>Delivery & Supply input form</p>
            </div>
          </button>

          <button 
            className={`${styles.cardBtn} ${styles.reBtn}`}
            style={{ backgroundColor: '#475569' }}
            onClick={() => navigate('adminPanel')}
          >
            <div className={styles.btnContent}>
              <h2>Admin Panel</h2>
              <p>Dashboard & Analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandSelection;
