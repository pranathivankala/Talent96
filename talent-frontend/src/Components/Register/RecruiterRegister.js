import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecruiterRegister.css';

function RecruiterRegister() {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    companyEmail: '',
    workEmail: '',
    password: '',
    contact: '',
  });

  const [companyLogo, setCompanyLogo] = useState(null); // State for file upload

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    console.log('Form Data Submitted:', {
      ...formData,
      companyLogo,
    });

    alert('Registration Successful!');


    setFormData({
      fullName: '',
      companyName: '',
      companyEmail: '',
      workEmail: '',
      password: '',
      contact: '',
    });
    setCompanyLogo(null);
  };

  return (
    <div className="bigcontainer">
      <div className="reg-container">
        <h2 className="name">Recruiter Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="sec">
            <label htmlFor="fullName">
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your Full Name"
              required
            />
          </div>

          <div className="sec">
            <label htmlFor="companyName">
              Company Name <span>*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your Company Name"
              required
            />
          </div>

          <div className="sec">
            <label htmlFor="companyEmail">
              Company Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              placeholder="Enter your Company Email Address"
              required
            />
          </div>

          <div className="sec">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a Password"
              required
            />
          </div>
          <div className="sec">
            <label htmlFor="companyLogo">
              Upload Company Logo <span>*</span>
            </label>
            <input
              type="file"
              id="companyLogo"
              accept=".png,.jpg,.jpeg"
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
              <Link to="/login-recruiter" className="signin-link-text">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecruiterRegister;
