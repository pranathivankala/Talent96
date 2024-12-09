import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Page1.css";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "Full-time",
    location: "",
    workMode: "Remote",
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
    <div className="full-container">
      <h1 className="heading_1">Job Details</h1>
      <form>
        <div className="form_filed">
          <label>Job Title</label>
          <input type="text"name="jobTitle"value={formData.jobTitle}onChange={handleChange}required/>
        </div>
        <div className="form_field">
          <label>Job Description</label>
          <textarea name="jobDescription"value={formData.jobDescription}onChange={handleChange}rows="5"required/>
        </div>
        <div className="form_field">
          <label>Job Type</label>
          <select name="jobType"value={formData.jobType}onChange={handleChange} required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form_field">
          <label>Country</label>
          <select onChange={handleCountryChange} required>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
          </select>
        </div>
        {cities.length > 0 && (
          <div className="form_field">
            <label>City</label>
            <select onChange={handleCityChange} required>
              <option value="">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form_field">
          <label>Work Mode</label>
          <div className="radio-buttons">
            <label><input type="radio"name="workMode"value="Remote"checked={formData.workMode === "Remote"}onChange={handleChange}/>Remote</label>
            <label><input type="radio"name="workMode"value="On-site"checked={formData.workMode === "On-site"}onChange={handleChange}/>On_site</label>
            <label><input type="radio"name="workMode"value="Hybrid"checked={formData.workMode === "Hybrid"}onChange={handleChange}/>Hybrid</label>
          </div>
        </div>
        <button type="button" className="next_btn" onClick={handleNext}>NEXT</button>
      </form>
    </div>
  );
};

export default Page1;
