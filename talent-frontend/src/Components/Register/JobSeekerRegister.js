import React, { useState } from 'react';
import './JobSeekerRegister.css';

const JobSeekerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Seeker Registered:", formData);
  };

  return (
    <div className="job-seeker-register">
      <h2>Job Seeker Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default JobSeekerRegister;
