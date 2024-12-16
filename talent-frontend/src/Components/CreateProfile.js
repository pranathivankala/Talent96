import React, { useState } from 'react';
import styles from './CreateProfile.module.css';

const CreateProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newExperience, setNewExperience] = useState({ company: '', role: '', duration: '', salary: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '' });


  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput)) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };
  const handleAddExperience = () => {
    if (newExperience.company && newExperience.role) {
      setExperience([...experience, newExperience]);
      setNewExperience({ company: '', role: '', duration: '', salary: '' });
    } else {
      alert('Company and Role are required.');
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, newProject]);
      setNewProject({ title: '', description: '' });
    } else {
      alert('Project Title and Description are required.');
    }
  };

  return (
    <div className={styles.bigbox}>
      <div className={styles.container}>
        {/* Profile Information Section */}
        <div className={styles.profileInfo}>
          <h1>Your Profile</h1>

          {/* Profile Photo Section */}
          <div id="profilePhoto" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Profile Photo</h2>
              <div className={styles.profilePhotoSection}>
                <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} />
                <input 
                  type="file" 
                  onChange={handleProfilePhotoChange} 
                  className={styles.fileInput} 
                  accept="image/*" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div id="personalInfo" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Personal Information</h2>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input type="text" required />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" required />
              </div>
              <div className={styles.formGroup}>
                <label>Phone:</label>
                <input type="number" required />
              </div>
              <div className={styles.formGroup}>
                <label>Gender:</label>
                <select required>
                  <option value="select">select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth:</label>
                <input type="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>Languages:</label>
                <input type="text" required />
              </div>
            </div>
          </div>

          {/* Resume Information */}
          <div id="resumeInfo" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Resume Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="resumeUpload" className={styles.label}>Upload Resume:</label>
                <input
                  type="file"
                  id="resumeUpload"
                  accept=".pdf, .doc, .docx, .rtf"
                  className={styles.fileInput}
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      alert(`Uploaded: ${e.target.files[0].name}`);
                    }
                  }}
                  required
                />
              </div>
              <p className={styles.note}>
                Supported Formats: PDF, DOC, DOCX, RTF (Max size: 2MB)
              </p>
            </div>
          </div>

          {/* Key Skills */}
          <div id="keySkills" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Key Skills</h2>
              <div className={styles.formGroup}>
                <label htmlFor="skillInput">Required Skills</label>
                <div>
                  <input
                    type="text"
                    id="skillInput"
                    className={styles['job-input']}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Enter a skill"
                    required
                  />
                  <button type="button" className={styles.buttonadd} onClick={handleAddSkill}>
                    Add
                  </button>
                </div>
                <div className={styles.requiredSkills}>
                  {requiredSkills.map((skill, index) => (
                    <span key={index} className={styles.skillItem}>
                      {skill}
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div id="education" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Education</h2>

              <div className={styles.formGroup}>
                <label>UG College Name:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
              </div>

              <div className={styles.formGroup}>
                <label>College Name:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
              </div>

              <div className={styles.formGroup}>
                <label> School Name:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
              </div>
              <div className={styles.formGroup}>
                <label>Institution PG(optional):</label>
                <input type="text"  />
                <label>Passout Year:</label>
                <input type="number"  />
                <label>CGPA:</label>
                <input type="number" step="0.01"  />
              </div>
            </div>
          </div>

          {/* Career Profile */}
          <div id="careerProfile" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Career Profile</h2>
              <div className={styles.formGroup}>
                <label>Industry:</label>
                <select required>
                <option value='select'>Select your Industry....</option>
                  <option value="IT">IT</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Role:</label>
                <select required>
                  <option value='select'>Select your Role....</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          {/* <div id="personalDetails" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Personal Details</h2>
              <div className={styles.formGroup}>
                <label>Gender:</label>
                <select required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth:</label>
                <input type="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>Languages:</label>
                <input type="text" required />
              </div>
            </div>
          </div> */}

          {/* Experience Section */}
          <div id="experience" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Experience</h2>
              <div className={styles.formGroup}>
                <label>Company:</label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  required
                />
                <label>Role:</label>
                <input
                  type="text"
                  value={newExperience.role}
                  onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                  required
                />
                <label>Duration:</label>
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                />
                <label>Salary:</label>
                <input
                  type="number"
                  value={newExperience.salary}
                  onChange={(e) => setNewExperience({ ...newExperience, salary: e.target.value })}
                />
                <button type="button" className={styles.experiencebutton} onClick={handleAddExperience}>
                  Add Experience
                </button>
              </div>
              <ul className={styles.experienceList}>
                {experience.map((exp, index) => (
                  <li key={index} className={styles.experienceItem}>
                    {exp.company} - {exp.role} ({exp.duration || 'N/A'}, {exp.salary || 'N/A'})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Projects</h2>
              <div className={styles.formGroup}>
                <label>Project Title:</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
                <label>Project Description:</label>
                <textarea className={styles.description_to}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
                <button type="button" className={styles.project_button} onClick={handleAddProject}>
                  Add Project
                </button>
              </div> 
              <ul className={styles.projectList}>
                {projects.map((project, index) => (
                  <li key={index} className={styles.projectItem}>
                    <strong>{project.title}</strong>: {project.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Save Button */}
          <div className={styles.saveButtonSection}>
            <button className={styles.saveButton}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
