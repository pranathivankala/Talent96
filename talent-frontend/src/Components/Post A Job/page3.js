import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page3.module.css';

function Page3() {
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [applicationLink, setApplicationLink] = useState('');

  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput)) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      requiredSkills,
      experienceLevel,
      salaryRange,
      applicationLink,
    };
    console.log('Form Data:', formData);
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className={styles['page-no-3']}>
      <div className={styles['job-container']}>
        <h2 className={styles['job-heading']}>Job Requirements</h2>
        <form className={styles['job-form']} onSubmit={handleSubmit}>
          <div>
            <label className={styles['job-label']} htmlFor="skillInput">Required Skills:</label>
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
                className={styles['job-btn']}
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
            <div className={styles['job-skill-list']}>
              {requiredSkills.map((skill, index) => (
                <span key={index} className={styles['job-skill']}>
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)}>X</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className={styles['job-label']} htmlFor="experienceLevel">Experience Level:</label>
            <select
              id="experienceLevel"
              className={styles['job-select']}
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
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
          <div>
            <label className={styles['job-label']} htmlFor="salaryRange">Salary Range:</label>
            <input
              type="text"
              id="salaryRange"
              className={styles['job-input']}
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="Enter salary range"
            />
          </div>
          <div>
            <label className={styles['job-label']} htmlFor="applicationLink">Application Link:</label>
            <input
              type="url"
              id="applicationLink"
              className={styles['job-input']}
              value={applicationLink}
              onChange={(e) => setApplicationLink(e.target.value)}
              placeholder="Enter application link"
            />
          </div>
          <div className={styles['button-container']}>
            <button
              type="button"
              className={styles['job-btn']}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button type="submit" className={styles['job-btn']}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page3;
