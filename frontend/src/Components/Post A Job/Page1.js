import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Page1.module.css";

const Page1 = ({ formData, handleChange, nextStep }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries')
      .then((response) => {
        const countryData = response.data.data.map((country) => ({
          name: country.country,
          cities: country.cities,
        }));
        setCountries(countryData);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const country = countries.find(country => country.name === selectedCountry);
    setCities(country ? country.cities : []);
    handleChange({ target: { name: "location", value: "" } }); 
  };

  const handleCityChange = (e) => {
    handleChange(e); 
  };

  const handleNextClick = () => {
    // const { jobTitle, jobDescription, jobType, location, workMode, numberOfPositions } = formData;

    // // if (!jobTitle || !jobDescription || !jobType || !location || !workMode || !numberOfPositions) {
    // //   alert("Please fill in all required fields before proceeding.");
    // //   return; 
    // // }

    console.log('Page 1 Data:', formData);
    localStorage.setItem('page1Data', JSON.stringify(formData));    
    nextStep(); 
  };

  return (
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.imageSection}>
          <img src="post-1.png" alt="Job Banner 1" />
        </div>
        <div className={styles.formSection}>
          <h1 className={styles.formHeading}>Job Details</h1>
          <form>
            <div className={styles.formGroup}>
              <label>Job Title <span className={styles.star}>*</span></label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter job title" required />
            </div>
            <div className={styles.formGroup}>
              <label>Job Description <span className={styles.star}>*</span></label>
              <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="5" placeholder="Describe the job responsibilities" required />
            </div>
            <div className={styles.formGroup}>
              <label>Job Type <span className={styles.star}>*</span></label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} required>
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Number of Positions <span className={styles.star}>*</span></label>
              <input type="number" name="numberOfPositions" value={formData.numberOfPositions} onChange={handleChange} min="1" placeholder="Enter number of positions" required />
            </div>
            <div className={styles.formGroup}>
              <label>Country <span className={styles.star}>*</span></label>
              <select onChange={handleCountryChange} required>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {cities.length > 0 && (
              <div className={styles.formGroup}>
                <label>City <span className={styles.star}>*</span></label>
                <select name="location" value={formData.location} onChange={handleCityChange} required>
                  <option value="">Select a city</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Work Mode <span className={styles.star}>*</span></label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="workMode" value="Remote" checked={formData.workMode === "Remote"} onChange={handleChange}/> Remote</label>
                <label><input type="radio" name="workMode" value="Onsite" checked={formData.workMode === "Onsite"} onChange={handleChange}/> On-site</label>
                <label><input type="radio" name="workMode" value="Hybrid"  checked={formData.workMode === "Hybrid"}  onChange={handleChange} /> Hybrid</label>
              </div>
            </div>
            <button type="button" className={styles.nextButton} onClick={handleNextClick}>NEXT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page1;
