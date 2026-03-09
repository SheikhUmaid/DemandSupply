import React, { useState } from 'react';
import styles from './authentication.module.css';

const Authentication = ({ navigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg(''); // Clear error on typing
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (formData.username === 'admin' && formData.password === 'admin') {
        navigate('landing');
      } else {
        setErrorMsg('Invalid credentials. Use admin / admin');
      }
    } else {
      // For sign up, just proceed as demo
      navigate('landing');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Please enter your details to sign in.
          </p>
          <p className={styles.demoTip}>
            Demo credentials: <strong>admin</strong> / <strong>admin</strong>
          </p>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isLogin && (
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className={styles.footer}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <a
            href="#"
            className={styles.footerLink}
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
