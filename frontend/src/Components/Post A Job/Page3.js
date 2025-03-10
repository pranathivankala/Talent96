import React, { useState, useEffect } from 'react';
import styles from './Page3.module.css';

const Page3 = ({ formData, handleChange, prevStep, nextStep }) => {
  const [localData, setLocalData] = useState({
    requiredSkills: [],
    experienceLevel: "",
    salaryRange: "",
    applicationLink: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalData({
        requiredSkills: formData.requiredSkills || [],
        experienceLevel: formData.experienceLevel || "",
        salaryRange: formData.salaryRange || "",
        applicationLink: formData.applicationLink || "",
      });
    }
  }, [formData]);


  const handleAddSkill = () => {
    const { skillInput } = localData;
    if (skillInput && !localData.requiredSkills.includes(skillInput)) {
      const updatedSkills = [...localData.requiredSkills, skillInput.trim()];

      setLocalData((prevData) => ({
        ...prevData,
        requiredSkills: updatedSkills,
        skillInput: '',
      }));

      handleChange({
        target: {
          name: "requiredSkills",
          value: updatedSkills
        }
      });
    }
  };


  const handleRemoveSkill = (skill) => {
    const updatedSkills = localData.requiredSkills.filter((s) => s !== skill);
  
    setLocalData((prevData) => ({
      ...prevData,
      requiredSkills: updatedSkills,
    }));
  
    // Update formData to ensure changes are passed correctly
    handleChange({
      target: {
        name: "requiredSkills",
        value: updatedSkills
      }
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleChange(e);
  };

  const handleNext = () => {
    const combinedData = { ...formData, ...localData };
  
    console.log('Combined Data for Preview:', JSON.stringify(combinedData, null, 2));
  
    localStorage.setItem('combinedData', JSON.stringify(combinedData));
  
    nextStep(); 
  };
  
  const handlePrevious = () => {
    prevStep();
  };

  return (
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.imageSection}>
          <img src="job-req.png" alt="Job Banner 1" />
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.formHeading}>Job Requirements</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="skillInput">Required Skills</label>
              <div>
                <input type="text" id="skillInput" className={styles['job-input']} value={localData.skillInput || ''} onChange={(e) => setLocalData({ ...localData, skillInput: e.target.value })} placeholder="Enter a skill" />
                <button type="button" className={styles.button} onClick={handleAddSkill}> Add </button>
              </div>
              <div className={styles.requiredSkills}>
                {localData.requiredSkills.map((skill, index) => (
                  <span key={index}>{skill}
                    <button type="button" className={styles.removeButton} onClick={() => handleRemoveSkill(skill)}>X</button>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="experienceLevel">Experience Level</label>
              <select id="experienceLevel" value={localData.experienceLevel} onChange={handleInputChange} name="experienceLevel">
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
              <input type="text" id="salaryRange" value={localData.salaryRange} onChange={handleInputChange} name="salaryRange" placeholder="Enter salary range" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="applicationLink">Application Link</label>
              <input type="url" id="applicationLink" value={localData.applicationLink} onChange={handleInputChange} name="applicationLink" placeholder="Enter application link" />
            </div>
            <div className={styles.btns}>
              <button type="button" className={styles.previousButton} onClick={handlePrevious}>Previous</button>
              <button type="button" className={styles.nextButton} onClick={handleNext}>Preview</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page3;
