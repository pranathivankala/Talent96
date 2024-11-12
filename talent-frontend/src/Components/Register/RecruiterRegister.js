import React, { useState } from 'react';
import './RecruiterRegister.css';

const RecruiterRegister = () => {
  const [formData, setFormData] = useState({
    Name: '',
    company: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyWebsite: '',
    country: '',
    phone: '',
    gmail: '',
    countryCode: '+1', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recruiter Registered:", formData);
  };

  return (
    <div className="recruiter-register">
      <h2>Recruiter Registration</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="Name" 
          placeholder="Name" 
          value={formData.Name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="company" 
          placeholder="Company" 
          value={formData.company} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="role" 
          placeholder="Role" 
          value={formData.role} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="companyWebsite" 
          placeholder="Company Website" 
          value={formData.companyWebsite} 
          onChange={handleChange} 
        />
        
        {/* Country Dropdown */}
        <select 
          name="country" 
          value={formData.country} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <div className="phone-container">
          <select 
            name="countryCode" 
            value={formData.countryCode} 
            onChange={handleChange}
            required
          >
            <option value="+1">+1 (USA)</option>
            <option value="+91">+91 (India)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+61">+61 (Australia)</option>
            <option value="+1">+1 (Canada)</option>
          </select>
          <input 
            type="text" 
            name="phone" 
            placeholder="Phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

       
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RecruiterRegister;
