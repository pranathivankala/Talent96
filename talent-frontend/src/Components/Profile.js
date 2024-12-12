import React from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.bigbox}>
      <div className={styles.container}>
        
        {/* Quick Links Section */}
        <div className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#profilePhoto">Profile Photo</a></li>
            <li><a href="#personalInfo">Personal Info</a></li>
            <li><a href="#resumeInfo">Resume Info</a></li>
            <li><a href="#keySkills">Key Skills</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#careerProfile">Career Profile</a></li>
            <li><a href="#personalDetails">Personal Details</a></li>
          </ul>
        </div>

        {/* Profile Information Section */}
        <div className={styles.profileInfo}>
          <h1>Your Profile</h1>

          {/* Profile Photo Section */}
          <div id="profilePhoto" className={styles.section}>
            <h2>Profile Photo</h2>
            <div className={styles.profilePhotoSection}>
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className={styles.profilePhoto} 
              />
              <button className={styles.editButton}>Edit Photo</button>
            </div>
          </div>

          {/* Personal Information */}
          <div id="personalInfo" className={styles.section}>
            <h2>Personal Information</h2>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <span>John Doe</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <span>johndoe@example.com</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            {/* Add more fields here */}
          </div>

          {/* Resume Information */}
          <div id="resumeInfo" className={styles.section}>
            <h2>Resume Information</h2>
            <div className={styles.formGroup}>
              <label>Resume:</label>
              <span>resume.pdf</span>
              <button className={styles.downloadButton}>Download</button>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>

          {/* Key Skills */}
          <div id="keySkills" className={styles.section}>
            <h2>Key Skills</h2>
            <div className={styles.formGroup}>
              <span>React, Node.js, JavaScript</span>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>

          {/* Education */}
          <div id="education" className={styles.section}>
            <h2>Education</h2>
            <div className={styles.formGroup}>
              <span>Bachelor of Science in Computer Science</span>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>

          {/* Projects */}
          <div id="projects" className={styles.section}>
            <h2>Projects</h2>
            <div className={styles.formGroup}>
              <span>Portfolio Website, Job Portal App</span>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>

          {/* Career Profile */}
          <div id="careerProfile" className={styles.section}>
            <h2>Career Profile</h2>
            <div className={styles.formGroup}>
              <label>Industry:</label>
              <span>Software Development</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.formGroup}>
              <label>Role:</label>
              <span>Software Engineer</span>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>

          {/* Personal Details */}
          <div id="personalDetails" className={styles.section}>
            <h2>Personal Details</h2>
            <div className={styles.formGroup}>
              <label>Gender:</label>
              <span>Male</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.formGroup}>
              <label>Date of Birth:</label>
              <span>01-Jan-1990</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.formGroup}>
              <label>Languages:</label>
              <span>English, Spanish</span>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
