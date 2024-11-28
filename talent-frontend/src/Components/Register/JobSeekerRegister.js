import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JobSeekerRegister.css'

function JobSeekerRegister() {
  const [setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className='bigcontainer'>
    <div className="reg-container">
      <h2 className='name'>Create an Account.</h2>
      <form onSubmit={handleSubmit}>
        <div className="sec">
          <label htmlFor="fullname">
            Full Name <span>*</span>
          </label>
          <input type="text" id="fullname" placeholder="Enter your Full name" required />
        </div>

        <div className="sec">
          <label htmlFor="email">
            Email Address <span>*</span>
          </label>
          <input type="email" id="email" placeholder="Enter your Email address" required />
        </div>

        <div className="sec">
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input type="password" id="password" placeholder="Create your password" required />
        </div>

        <div className="sec">
          <label htmlFor="mobile">
            Mobile Number <span>*</span>
          </label>
          <input type="tel" id="mobile" placeholder="+91 Enter your mobile number" required />
        </div>

        <div className="sec">
          <label htmlFor="resume">
            Upload Resume <span>*</span>
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
        <div className="signin-link">
          <p>
            Already registered?{' '}
            <Link to="/job-seeker-login" className="signin-link-text">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default JobSeekerRegister;
