import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateProfile.module.css';
import { UserContext } from './UserContext';

const API_URL = process.env.REACT_APP_API_URL;

const CreateProfile = () => {
  const { userData } = useContext(UserContext); // Get the user data from context
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newExperience, setNewExperience] = useState({ company: '', role: '', duration: '', salary: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    languages: '',
    education: {
      ug: { institution: '', year: '', cgpa: '' },
      college: { institution: '', year: '', cgpa: '' },
      school: { institution: '', year: '', cgpa: '' },
      pg: { institution: '', year: '', cgpa: '' }
    },
    industry: '',
    role: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        name: userData.username || prevFormData.name,
        email: userData.email || prevFormData.email,
        phone: userData.mobile || prevFormData.phone,
      }));
    }

    const storedData = localStorage.getItem('userRegistrationData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(prevFormData => ({
          ...prevFormData,
          name: parsedData.name || prevFormData.name,
          email: parsedData.email || prevFormData.email,
          phone: parsedData.phone || prevFormData.phone,
        }));
        localStorage.removeItem('userRegistrationData');
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, [userData]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleResumeChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      alert(`Uploaded: ${ e.target.files[0].name }`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('profilePhoto', profilePhoto === "https://via.placeholder.com/150" ? "" : profilePhoto);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('gender', formData.gender);
    data.append('dob', formData.dob);
    data.append('languages', formData.languages);
    data.append('skills', JSON.stringify(requiredSkills));
    data.append('experience', JSON.stringify(experience));
    data.append('projects', JSON.stringify(projects));
    data.append('education', JSON.stringify(formData.education));
    data.append('industry', formData.industry);
    data.append('role', formData.role);
    if (resumeFile) {
      data.append('resume', resumeFile);
    }
    try {
      const response = await axios.post(`${API_URL}/api/profiles`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile created successfully!');
      navigate('/career');
      setFormData({
        name: '', email: '', phone: '', gender: '', dob: '', languages: '',
        education: { ug: { institution: '', year: '', cgpa: '' }, college: { institution: '', year: '', cgpa: '' }, school: { institution: '', year: '', cgpa: '' }, pg: { institution: '', year: '', cgpa: '' } },
        industry: '', role: '',
      });
      setRequiredSkills([]);
      setExperience([]);
      setProjects([]);
      setProfilePhoto("https://via.placeholder.com/150");
      setResumeFile(null);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert(`Failed to create profile: ${error.message || 'Unknown error'}`);
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
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Phone:</label>
                <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="select">select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Languages:</label>
                <input type="text" name="languages" value={formData.languages} onChange={handleInputChange} required />
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

                <label>Institution UG:</label>
                <input type="text" required />
                <label>UG College Name:</label>
                <input type="text" name="ugCollegeName"
                  value={formData.education.ug.collegeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: {
                        ...formData.education,
                        ug: { ...formData.education.ug, collegeName: e.target.value },
                      },
                    })
                  }
                  required />
                <label>Passout Year:</label>
                <input type="number" name="passoutyear" value={formData.education.ug.passoutyear} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ug: { ...formData.education.ug, passoutyear: e.target.value }, }, })} required />
                <label>CGPA:</label>
                <input type="number" step="0.01" name="ugCgpa" value={formData.education.ug.ugCgpa} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ug: { ...formData.education.ug, cgpa: e.target.value }, }, })} required />
              </div>

              <div className={styles.formGroup}>
                <label>Institution College:</label>
                <input type="text" required />
                <label>College Name:</label>
                <input type="text" name="collegeCollegeName"
                  value={formData.education.college.collegeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: {
                        ...formData.education,
                        college: { ...formData.education.college, collegeName: e.target.value },
                      },
                    })
                  }
                  required />
                <label>Passout Year:</label>
                <input type="number" name="collegepassoutyear" value={formData.education.college.passoutyear} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, college: { ...formData.education.college, passoutyear: e.target.value }, }, })} required />
                <label>CGPA:</label>
                <input type="number" step="0.01" name="collegeCgpa" value={formData.education.college.collegeCgpa} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, college: { ...formData.education.college, cgpa: e.target.value }, }, })} required />
              </div>

              <div className={styles.formGroup}>
                <label>Institution School:</label>
                <input type="text" required />
                <label> School Name:</label>
                <input type="text" name="schoolSchoolName"
                  value={formData.education.school.schoolName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: {
                        ...formData.education,
                        school: { ...formData.education.school, schoolName: e.target.value },
                      },
                    })
                  }
                  required />
                <label>Passout Year:</label>
                <input type="number" name="schoolpassoutyear" value={formData.education.school.passoutyear} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, school: { ...formData.education.school, passoutyear: e.target.value }, }, })} required />
                <label>CGPA:</label>
                <input type="number" step="0.01" name="schoolCgpa" value={formData.education.school.schoolCgpa} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, school: { ...formData.education.school, cgpa: e.target.value }, }, })} required />
              </div>

              <div className={styles.formGroup}>
                <label>Institution PG(optional):</label>
                <input type="text" name="pgCollegeName"
                  value={formData.education.pg.collegeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: {
                        ...formData.education,
                        pg: { ...formData.education.pg, collegeName: e.target.value },
                      },
                    })
                  } required />
                <label>Passout Year:</label>
                <input type="number" name="pgpassoutyear" value={formData.education.pg.passoutyear} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, pg: { ...formData.education.pg, passoutyear: e.target.value }, }, })} required />
                <label>CGPA:</label>
                <input type="number" step="0.01" name="ugCgpa" value={formData.education.ug.ugCgpa} onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ug: { ...formData.education.ug, cgpa: e.target.value }, }, })} required />
              </div>
            </div>
          </div>

          {/* Career Profile */}
          <div id="careerProfile" className={styles.section}>
            <div className={styles.sectionWrapper}>
              <h2>Career Profile</h2>
              <div className={styles.formGroup}>
                <label>Industry:</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange} required>
                  <option value='select'>Select your Industry....</option>
                  <option value="IT">IT</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleInputChange} required>
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
                  maxLength={10000} required
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
            <button type="submit" className={styles.saveButton} onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;