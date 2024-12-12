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
            <div className={styles.linkWrapper}>
              <li><a href="#profilePhoto">Profile Photo</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#personalInfo">Personal Info</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#resumeInfo">Resume Info</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#keySkills">Key Skills</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#education">Education</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#projects">Projects</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#careerProfile">Career Profile</a></li>
            </div>
            <div className={styles.linkWrapper}>
              <li><a href="#personalDetails">Personal Details</a></li>
            </div>
          </ul>
        </div>

        {/* Profile Information Section */}
        <div className={styles.profileInfo}>
          <h1>Your Profile</h1>

          {/* Profile Photo Section */}
          <div id="profilePhoto" className={styles.section}>
            <div className={styles.sectionWrapper}>
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
          </div>

          {/* Personal Information */}
          <div id="personalInfo" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Personal Information</h2>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Resume Information */}
          <div id="resumeInfo" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Resume Information</h2>
              <div className={styles.formGroup}>
                <label>Resume:</label>
                <span>resume.pdf</span>
                <button className={styles.downloadButton}>Download</button>
                <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <div id="keySkills" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Key Skills</h2>
              <div className={styles.formGroup}>
              <input type='text'/>
              <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Education */}
          <div id="education" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Education</h2>
              <div className={styles.formGroup}>
              <input type='text'/>
              <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div id="projects" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Projects</h2>
              <div className={styles.formGroup}>
              <input type='text'/>
              <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Career Profile */}
          <div id="careerProfile" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Career Profile</h2>
              <div className={styles.formGroup}>
                <label>Industry:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
              <div className={styles.formGroup}>
                <label>Role:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div id="personalDetails" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Personal Details</h2>
              <div className={styles.formGroup}>
                <label>Gender:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
              <div className={styles.formGroup}>
                <label>Languages:</label>
                <input type='text'/>
                <button className={styles.editButton}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
