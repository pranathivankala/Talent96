import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Page1.css"; // Correct path

const Page1 = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "Full-time",
    location: "",
    workMode: "Remote",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isCitySelected, setIsCitySelected] = useState(false); // Flag to prevent further suggestions

  // Fetch countries on component mount
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        const countryData = response.data.data.map((country) => ({
          name: country.country,
          cities: country.cities,
        }));
        setCountries(countryData);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const country = countries.find((country) => country.name === selectedCountry);
    setCities(country ? country.cities : []);
    setFormData({ ...formData, location: "" });
    setIsCitySelected(false); // Reset flag when changing country
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
    setIsCitySelected(false); // City is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Details Submitted:", formData);
  };

  return (
    <div className="full">
    <div className="container">
      <h1 className="heading">Job Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="inputGroup">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        {/* Job Description */}
        <div className="inputGroup">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        {/* Job Type */}
        <div className="inputGroup">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
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

        {/* Location */}
        <div className="inputGroup">
          <label htmlFor="country">Country</label>
          <select id="country" onChange={handleCountryChange} required>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {!isCitySelected && cities.length > 0 && (
          <div className="inputGroup">
            <label htmlFor="city">City</label>
            <select id="city" onChange={handleCityChange} required>
              <option value="">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Remote/On-site */}
        <div className="inputGroup">
          <label>Remote/On-site</label>
          <div className="radioGroup">
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

        <button type="submit" className="submitButton">
          NEXT
        </button>
      </form>
    </div>
    </div>
  );
};

export default Page1;