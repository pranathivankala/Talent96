import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");

  const [resumeUrl, setResumeUrl] = useState(null); 
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [experiences, setExperiences] = useState([ { role: '', company: '', startDate: '', endDate: '', description: '' } ]);
  const [projects, setProjects] = useState([ { title: '', description: '', technologies: '' } ]);

   // eslint-disable-next-line no-unused-vars
   const [profileData, setProfileData] = useState(null);

    // Fetching data from backend (replace the URL with your actual endpoint)
    useEffect(() => {
      fetch('http://localhost:3001/profiles/your-email@example.com')  // Adjust the URL to your backend endpoint
        .then((response) => response.json())
        .then((data) => {
          // Set the state with the data from the backend
          setProfileData(data);
          
          // Populate states with fetched data
          setProfilePhoto(data.profilePhoto || "https://via.placeholder.com/150");
          setResumeUrl(data.resumeUrl);
          setSkills(data.skills || []);
          setExperiences(data.experiences || [{ role: '', company: '', startDate: '', endDate: '', description: '' }]);
          setProjects(data.projects || [{ title: '', description: '', technologies: '' }]);
        })
        .catch((error) => console.error('Error fetching profile data:', error));
    }, []);

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleSkillInputChange = (e) => {
    setNewSkill(e.target.value);
  };


  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

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

  // const [experiences, setExperiences] = useState([
  //   { role: '', company: '', startDate: '', endDate: '', description: '' },
  // ]);
  // const [projects, setProjects] = useState([
  //   { title: '', description: '', technologies: '' },
  // ]);

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { role: '', company: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const handleRemoveExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', technologies: '' },
    ]);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.bigbox}>
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          <h1>Your Profile</h1>

          {/* Profile Photo Section */}
          <div id="profilePhoto" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Profile Photo</h2>
              <div className={styles.profilePhotoSection}>
                <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} />
                <div className={styles.editButtonWrapper}>
                  <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    Edit
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleProfilePhotoChange}
                    className={styles.fileInput}
                    accept="image/*"
                    required
                    style={{ display: 'none' }} 
                  />
                </div>
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
              {resumeUrl ? (
                <div className={styles.formGroup}>
                  <label>Your Resume:</label>
                  <a href={resumeUrl} download className={styles.link}>
                    Download Resume
                  </a>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label htmlFor="resumeUpload" className={styles.label}>Upload Resume:</label>
                  <input
                    type="file"
                    id="resumeUpload"
                    accept=".pdf, .doc, .docx, .rtf"
                    className={styles.fileInput}
                    onChange={handleResumeUpload}
                    required
                  />
                </div>
              )}
            </div>
          </div>

  {/* skills section */}
  <div className={styles.formGroup}>
  <label>Skills</label>
  <ul>
    {skills.map((skill, index) => (
      <li key={index}>
        {skill}
        <button
          type="button"
          onClick={() => handleRemoveSkill(index)}
          className={styles.removeSkillButton}
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
  <input
    type="text"
    value={newSkill}
    onChange={handleSkillInputChange}
    placeholder="Add a new skill"
    required
  />
  <button type="button" onClick={handleAddSkill}>
    Add Skill
  </button>
</div>


          {/* Education */}
          <div id="education" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Education</h2>
              <div className={styles.formGroup}>
                <label>Institution UG:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
              </div>
              <div className={styles.formGroup}>
                <label>Institution College:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
              </div>
              <div className={styles.formGroup}>
                <label>Institution School:</label>
                <input type="text" required />
                <label>Passout Year:</label>
                <input type="number" required />
                <label>CGPA:</label>
                <input type="number" step="0.01" required />
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
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Role:</label>
                <select required>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>
          </div>
{/* Experience Section */}
<div className={styles.section}>
          <h2>Experience</h2>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.formGroup}>
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                required
              />
              <input type="date"value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} required />
              <input type="date"  value={exp.endDate}  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}/>
              <textarea  placeholder="Description"  value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} required/>
              {experiences.length > 1 && (
                <button type="button" onClick={() => handleRemoveExperience(index)}> Remove Experience </button>
              )}
            </div>
          ))}
          <button className={styles.ex} type="button" onClick={handleAddExperience}> Add Experience</button>
        </div>

        {/* Projects Section */}
        <div className={styles.section}>
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className={styles.formGroup}>
              <input type="text" placeholder="Title"  value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} required/>
              <textarea placeholder="Description" value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} required/>
              <input type="text"placeholder="Technologies"value={project.technologies}onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}required/>
              {projects.length > 1 && (
                <button type="button" onClick={() => handleRemoveProject(index)}>Remove Project </button>
              )}
            </div>
          ))}
          <button className={styles.pro} type="button" onClick={handleAddProject}>Add Project</button>
        </div>
      </div>
    </div>
        </div>
  );
};

export default Profile;