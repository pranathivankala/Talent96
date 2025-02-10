import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PreviewPage.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const PreviewPage = ({ formData , prevStep}) => {
  const [combinedData, setCombinedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('combinedData');
    if (savedData) {
      setCombinedData(JSON.parse(savedData));
    } else {
      setCombinedData(formData);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'requiredSkills') {
      newValue = value.split(',').map(skill => skill.trim());
    }

    setCombinedData({
      ...combinedData,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    const requiredFields = ['companyName', 'jobTitle', 'location', 'requiredSkills', 'experienceLevel'];
    for (const field of requiredFields) {
      if (!combinedData[field] || (Array.isArray(combinedData[field]) && combinedData[field].length === 0)) {
        alert(`${field} is required.`);
        return;
      }
    }

    try {
      const response = await axios.post(`${API_URL}/api/job_posts`, combinedData);
      console.log('Data saved:', response.data);
      alert('Job posting submitted successfully!');
      navigate('/Home'); 
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting job posting. Please try again.');
    }
  };


  const requiredSkillsFormatted = Array.isArray(combinedData.requiredSkills)
    ? combinedData.requiredSkills.join(', ')
    : '';

    const handlePrevious = () => {
        prevStep(); 
      };
  return (
    <div className={styles.previewContainer}>
      <h2 className={styles.heading}>Preview Your Job Posting</h2>

      <form className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>Job Title</label>
          <input type="text" value={combinedData.jobTitle || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Job Description</label>
          <textarea value={combinedData.jobDescription || ''} readOnly className={styles.previewTextarea} />
        </div>

        <div className={styles.formGroup}>
          <label>Job Type</label>
          <input type="text" value={combinedData.jobType || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Location</label>
          <input type="text" value={combinedData.location || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Work Mode</label>
          <input type="text" value={combinedData.workMode || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Number of Positions</label>
          <input type="number" value={combinedData.numberOfPositions || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input type="text" value={combinedData.companyName || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Company Website</label>
          <input type="url" value={combinedData.companyWebsite || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Company Logo</label>
          <input type="url" value={combinedData.companyLogo || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Company Description</label>
          <textarea value={combinedData.companyDescription || ''} readOnly className={styles.previewTextarea} />
        </div>

        <div className={styles.formGroup}>
          <label>Required Skills</label>
          <input type="text" name="requiredSkills" value={requiredSkillsFormatted} onChange={handleInputChange} placeholder="e.g., Java, React, Spring Boot" className={styles.previewInput}/>
        </div>

        <div className={styles.formGroup}>
          <label>Experience Level</label>
          <input type="text" value={combinedData.experienceLevel || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Salary Range</label>
          <input type="text" value={combinedData.salaryRange || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.formGroup}>
          <label>Application Link</label>
          <input type="url" value={combinedData.applicationLink || ''} readOnly className={styles.previewInput} />
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.submitButton} onClick={handleSubmit}>Submit Job Posting</button>
          <button type="button" className={styles.submitButton} onClick={handlePrevious}>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default PreviewPage;
