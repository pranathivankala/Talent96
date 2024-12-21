import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page3.module.css';
import axios from 'axios';

function Page3() {
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [applicationLink, setApplicationLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Retrieve data from previous pages stored in localStorage
  const page1Data = JSON.parse(localStorage.getItem('page1Data')) || {};
  const page2Data = JSON.parse(localStorage.getItem('page2Data')) || {};
  console.log('Page 1 Data on Page 3:', page1Data);
  console.log('Page 2 Data on Page 3:', page2Data);

  // Handle adding skills to the list
  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput)) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Handle removing skills from the list
  const handleRemoveSkill = (skill) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine form data with Page 1 and Page 2 data
    const formData = {
      ...page1Data, // Page 1 data (job title, company name, etc.)
      ...page2Data, // Page 2 data (job description, etc.)
      requiredSkills, // Additional skills from this page
      experienceLevel,
      salaryRange,
      applicationLink,
    };

    // Structure the form data to match the desired object for submission
    const jobPostDetails = {
      jobTitle: page1Data.jobTitle || '', // Add this field from page1Data
      jobDescription: page2Data.jobDescription || '', // Add this field from page2Data
      jobType: page1Data.jobType || '', // Add this field from page1Data
      location: page1Data.location || '', // Add this field from page1Data
      workMode: page1Data.workMode || '', // Add this field from page1Data
      numberOfPositions: page1Data.numberOfPositions || 0, // Add this field from page1Data
      companyName: page1Data.companyName || '', // Add this field from page1Data
      companyWebsite: page1Data.companyWebsite || '', // Add this field from page1Data
      companyLogo: page1Data.companyLogo || '', // Add this field from page1Data
      companyDescription: page1Data.companyDescription || '', // Add this field from page1Data
      requiredSkills, // Skills from this page
      experienceLevel, // Experience level from this page
      salaryRange, // Salary range from this page
      applicationLink, // Application link from this page
    };

    // Log the formatted job post details to the console for debugging
    console.log('Entered Job Post Details:', jobPostDetails);

    try {
      // POST request to backend API to create a new job post
      const response = await axios.post('http://localhost:3001/job_posts', jobPostDetails);
      console.log('Job post added successfully', response.data);

      // Navigate to the 'career' page after successful submission
      navigate('/career'); // Navigate to the career page

    } catch (error) {
      console.error('Error posting job:', error);
      setErrorMessage(
        error.response ? error.response.data.message : 'Failed to post job. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  function isValidURL(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  }

  // Navigate to the previous page
  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.imageSection}>
          <img src="job-req.png" alt="Job Banner 1" />
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.formHeading}>Job Requirements</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="skillInput">Required Skills</label>
              <div>
                <input
                  type="text"
                  id="skillInput"
                  className={styles['job-input']}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter a skill"
                />
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleAddSkill}
                  disabled={isSubmitting}
                >
                  Add
                </button>
              </div>
              <div className={styles.requiredSkills}>
                {requiredSkills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveSkill(skill)}
                      disabled={isSubmitting}
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="experienceLevel">Experience Level</label>
              <select
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select Experience Level</option>
                <option value="Fresher">Fresher</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7+ Years</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="salaryRange">Salary Range</label>
              <input
                type="text"
                id="salaryRange"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="Enter salary range"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="applicationLink">Application Link</label>
              <input
                type="url"
                id="applicationLink"
                value={applicationLink}
                onChange={(e) => setApplicationLink(e.target.value)}
                placeholder="Enter application link"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.btns}>
              <button
                type="button"
                className={styles.previousButton}
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </button>
              <button
                type="submit"
                className={styles.nextButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page3;
