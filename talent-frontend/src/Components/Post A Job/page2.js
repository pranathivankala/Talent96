import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page2.module.css';

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
    <div className={styles['page2-full-container']}>
      <div className={styles['page_no_2']}>
        <img src="Company.png" alt="Company" />
        <div className={styles['page2-container']}>
          <h2>Company Information</h2>
          <form className={styles['page2-form']} onSubmit={handleSubmit}>
            <div className={styles['page2-form-group']}>
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
            <div className={styles['page2-form-group']}>
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
            <div className={styles['page2-form-group']}>
              <label htmlFor="companyLogo">Company Logo:</label>
              <input
                type="file"
                id="companyLogo"
                name="companyLogo"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className={styles['page2-form-group']}>
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
            <div className={styles['page2-navigation-buttons']}>
              <button
                type="button"
                className={styles['page2-previous-button']}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className={styles['page2-next-button']}
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
