import React, { useState } from 'react';
import '../login/RecruiterLogin.css';

const RecruiterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    console.log('Recruiter Login:', { email, password });

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Recruiter Login</h2>

        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit" className="submit-btn">
          Login
        </button>

        <div className="register-link">
          Don't have an account? <a href="/register-recruiter">Register here</a>
        </div>
      </form>
    </div>
  );
};

export default RecruiterLogin;
