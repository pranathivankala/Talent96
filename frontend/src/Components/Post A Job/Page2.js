import { useEffect, useState } from "react";
import styles from "./Page2.module.css";

const Page2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const [localData, setLocalData] = useState({
    companyName: "",
    companyWebsite: "",
    companyLogo: "",
    companyDescription: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalData({
        companyName: formData.companyName || "",
        companyWebsite: formData.companyWebsite || "",
        companyLogo: formData.companyLogo || "",
        companyDescription: formData.companyDescription || "",
      });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleChange(e); 
  };

  const handlePrevious = () => {
    prevStep(); 
  };

  const handleNext = () => {
    const { companyName, companyWebsite, companyLogo, companyDescription } = localData;
    // if (!companyName || !companyWebsite || !companyLogo || !companyDescription) {
    //   alert("Please fill in all required fields before proceeding.");
    //   return;
    // }
    const combinedData = { ...formData, ...localData };
    console.log("Combined Data from Page 1 and Page 2:", JSON.stringify(combinedData, null, 2));
    localStorage.setItem("combinedData", JSON.stringify(combinedData));
    nextStep();
  };

  return (
    <div className={styles.forBackground}>
      <div className={styles.pageContainer}>
        <div className={styles.rightpanel}>
          <h2 className={styles.formHeading}>Company Information</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name<span className={styles.star}>*</span></label>
              <input type="text" id="companyName" name="companyName" value={localData.companyName} onChange={handleInputChange} required/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyWebsite">Company Website<span className={styles.star}>*</span></label>
              <input type="text" id="companyWebsite" name="companyWebsite" value={localData.companyWebsite} onChange={handleInputChange} required/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyLogo">Company Logo (URL)<span className={styles.star}>*</span></label>
              <input type="text" id="companyLogo" name="companyLogo" value={localData.companyLogo} onChange={handleInputChange} required placeholder="Enter a URL (e.g., https://example.com/logo.jpg)"/>
              {localData.companyLogo && (
                <div className={styles.logoPreview}>
                  <a href={localData.companyLogo} target="_blank" rel="noopener noreferrer">View Logo</a>
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyDescription">Company Description<span className={styles.star}>*</span></label>
              <textarea id="companyDescription" name="companyDescription" value={localData.companyDescription} onChange={handleInputChange} required rows="5"></textarea>
            </div>
            <div className={styles.btns}>
              <button type="button" className={styles.previousButton} onClick={handlePrevious}> Previous </button>
              <button type="button" className={styles.nextButton} onClick={handleNext}> Next </button>
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
