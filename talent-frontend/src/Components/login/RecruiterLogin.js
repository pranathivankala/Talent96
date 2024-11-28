import React, { useState } from 'react';
import './RecruiterLogin.css';

const RecruiterLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="ctn">
      <div className="left">
        <div className="s-left">
          <h2>Welcome to Talent96</h2>
          <p>Find the best talent that matches your company's needs and culture.</p>
        </div>
      </div>

      <div className="right">
        <div className="form">
          <h1>Recruiter Sign In</h1>
          <div className="grp">
            <label htmlFor="company-name">Company Name :</label>
            <input type="text" id="company-name" placeholder="Enter your company name" />
          </div>
          <div className="grp">
            <label htmlFor="email">Company Email Address :</label>
            <input type="email" id="email" placeholder="Enter your registered company email" />
          </div>
          <div className="grp pass-cnt">
            <label htmlFor="password">Password :</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
            />
            <span className="eye-ico" onClick={togglePasswordVisibility}>
              {passwordVisible ? '👁️' : '🙈'}
            </span>
          </div>
          <a href="#" className="fg-pass">Forgot Password?</a>
          <button className="btn">Login →</button>
          <p>Don’t have an account? <a href="register-recruiter" className="link-signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
