import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Page1.module.css"; // Import CSS module
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "Full-time",
    location: "",
    workMode: "Remote",
    numberOfPositions: 1,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        const countryData = response.data.data.map((country) => ({
          name: country.country,
          cities: country.cities,
        }));
        setCountries(countryData);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const country = countries.find((country) => country.name === selectedCountry);
    setCities(country ? country.cities : []);
    setFormData({ ...formData, location: "" });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    navigate("/Page2");
  };

  return (
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.imageSection}>
          <img src="post1.png" alt="Job Banner 1" />
        </div>
        <div className={styles.formSection}>
          <h1 className={styles.formHeading}>Job Details</h1>
          <form>
            <div className={styles.formGroup}>
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Job Description</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the job responsibilities"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Number of Positions</label>
              <input
                type="number"
                name="numberOfPositions"
                value={formData.numberOfPositions}
                onChange={handleChange}
                min="1"
                placeholder="Enter number of positions"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
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
                <label>City</label>
                <select onChange={handleCityChange} required>
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
              <label>Work Mode</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="workMode"
                    value="Remote"
                    checked={formData.workMode === "Remote"}
                    onChange={handleChange}
                  />
                  Remote
                </label>
                <label>
                  <input
                    type="radio"
                    name="workMode"
                    value="On-site"
                    checked={formData.workMode === "On-site"}
                    onChange={handleChange}
                  />
                  On-site
                </label>
                <label>
                  <input
                    type="radio"
                    name="workMode"
                    value="Hybrid"
                    checked={formData.workMode === "Hybrid"}
                    onChange={handleChange}
                  />
                  Hybrid
                </label>
              </div>
            </div>
            <button type="button" className={styles.nextButton} onClick={handleNext}>
              NEXT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page1;
