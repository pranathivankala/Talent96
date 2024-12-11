import React, { useState } from 'react';
import './Page2.css';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    companyLogo: null,
    companyDescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, companyLogo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  const handlePrevious = () => navigate('/Page1');
  const handleNext = () => navigate('/Page3');

  return (
    <div className='page2-full-container'>
    <div className="page_no_2">
      <img src="Company.png" />
      <div className="page2-container">
        <h2>Company Information</h2>
        <form className="page2-form" onSubmit={handleSubmit}>
          <div className="page2-form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="page2-form-group">
            <label htmlFor="companyWebsite">Company Website:</label>
            <input
              type="text"
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="page2-form-group">
            <label htmlFor="companyLogo">Company Logo:</label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="page2-form-group">
            <label htmlFor="companyDescription">Company Description:</label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleInputChange}
              required
              rows="5"
            ></textarea>
          </div>
          <div className="page2-navigation-buttons">
            <button
              type="button"
              className="page2-previous-button"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              type="button"
              className="page2-next-button"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Page2;
