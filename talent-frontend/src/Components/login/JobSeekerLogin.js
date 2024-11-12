import React, { useState } from 'react';
import '../login/JobSeekerLogin';

const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    console.log('Job Seeker Login:', { email, password });

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Job Seeker Login</h2>
        
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
          Don't have an account? <a href="/register-job-seeker">Register here</a>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerLogin;
