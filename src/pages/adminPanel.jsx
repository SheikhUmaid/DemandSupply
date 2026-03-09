import React from 'react';
import styles from './adminPanel.module.css';

const AdminPanel = ({ navigate }) => {
  // Demo data for the bar graph
  const salesData = [30, 80, 45, 90, 60, 100, 50, 75, 40, 85, 55, 95];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>Command HQ</div>
        <div className={`${styles.menuItem} ${styles.active}`}>Dashboard</div>
        <div className={styles.menuItem}>Analytics</div>
        <div className={styles.menuItem}>Reports</div>
        <div className={styles.menuItem}>Settings</div>
        
        <div style={{ marginTop: 'auto' }}>
          <div className={styles.menuItem} onClick={() => navigate('auth')}>
            Log out
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>HQ Dashboard Overview</h1>
          <button className={styles.backBtn} onClick={() => navigate('demandSelection')}>
            Switch Portal
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Total Deliveries</h3>
            <p className={styles.statValue}>1,248</p>
            <p style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem' }}>+12% from last month</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Supply Requests</h3>
            <p className={styles.statValue}>854</p>
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>-5% from last month</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Active Agents</h3>
            <p className={styles.statValue}>64</p>
            <p style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem' }}>+2 this week</p>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Monthly Volume</h3>
          <div className={styles.graphPlaceholder}>
            {salesData.map((val, idx) => (
              <div 
                key={idx} 
                className={styles.bar} 
                style={{ height: `${val}%` }}
                title={`Value: ${val}`}
              ></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
