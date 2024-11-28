import React, { useState } from 'react';
import './JobSeekerLogin.css';

const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="job-seeker-login-container">
      {/* Left Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome to Talent96</h2>
          <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-section">
        <form onSubmit={handleLogin} className="login-form">
          <h1>Sign In</h1>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your registered email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
                title="Toggle Password Visibility"
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">Login →</button>
          <p className="signup-text">
            Don’t have an account? <a href="/job-seeker-register" className="signup-link">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
