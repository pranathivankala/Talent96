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
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.rightpanel}>
          <h2 className={styles.formHeading}>Company Information</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name<span className={styles.star}>*</span></label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
            </div>
            <div  className={styles.formGroup}>
              <label htmlFor="companyWebsite">Company Website<span className={styles.star}>*</span></label>
              <input type="text" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleInputChange} required />
            </div>
            <div  className={styles.formGroup}>
              <label htmlFor="companyLogo">Company Logo<span className={styles.star}>*</span></label>
              <input type="file" id="companyLogo" name="companyLogo" onChange={handleFileChange} required />
            </div>
            <div  className={styles.formGroup}>
              <label htmlFor="companyDescription">Company Description<span className={styles.star}>*</span></label>
              <textarea id="companyDescription" name="companyDescription" value={formData.companyDescription} onChange={handleInputChange} required rows="5"></textarea>
            </div>
            <div className={styles.btns}>
              <button type="button" className={styles.previousButton} onClick={handlePrevious}>Previous</button>
              <button type="button" className={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
          </form>
        </div>
        <div className={styles.imageSection}>
          <img src="company1.png" alt="Company" />
        </div>
      </div>
    </div>
  );
};

export default Page2;
