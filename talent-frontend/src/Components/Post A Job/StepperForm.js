import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import PreviewPage from './PreviewPage'; 

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobType: '',
    location: '',
    workMode: 'none',
    numberOfPositions: '',
    companyName: '',
    companyWebsite: '',
    companyLogo: '',
    companyDescription: '',
    requiredSkills: [],
    experienceLevel: '',
    salaryRange: '',
    applicationLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <Page1 formData={formData} handleChange={handleChange} nextStep={handleNext} />
      )}
      {step === 2 && (
        <Page2 formData={formData} handleChange={handleChange} nextStep={handleNext} prevStep={handlePrevious} />
      )}
      {step === 3 && (
        <Page3 formData={formData} handleChange={handleChange} prevStep={handlePrevious} nextStep={handleNext} />
      )}
      {step === 4 && (
        <PreviewPage formData={formData} prevStep={handlePrevious} /> 
      )}
    </div>
  );
};

export default StepperForm;
