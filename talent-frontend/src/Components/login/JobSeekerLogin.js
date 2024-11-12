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
    <div className="container">
      <div className="login-left">
        <div className="sub-left">
          <h2>Welcome to Talent96</h2>
          <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs..</p>
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleLogin} className="login-right">
          <h1>Sign In</h1>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label>Email Address :</label>
            <div className='Email-container'>
              <input
                type="email"
                placeholder="Enter your registered email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label>Password :</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Login →</button>
          <p>Don’t have an account? <a href="/jobSeekerRegister" className="signup-link">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
