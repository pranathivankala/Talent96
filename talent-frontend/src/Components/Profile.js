import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';
import { UserContext } from './UserContext';

const Profile = () => {
    const { userData } = useContext(UserContext); // Access user data from context
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userData?.email) {
                setError("Please log in to view your profile.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/profiles?email=${userData.email}`);
                if (response.data) {
                    setProfile(response.data);
                } else {
                    setError("Profile not found. Please create a profile.");
                }
            } catch (err) {
                setError("Failed to fetch profile. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userData]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={() => navigate('/profiles')}>Create Profile</button>
            </div>
        );
    }

    const handleEdit = () => {
        navigate(`/profiles/edit/${userData.email}`);
    };

    return (
        <div className={styles.profileContainer}>
            {profile && (
                <>
                    {/* Personal Information Section */}
                    <div className={styles.section}>
                        <h2>Personal Information</h2>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Gender:</strong> {profile.gender}</p>
                        <p><strong>Date of Birth:</strong> {profile.dob}</p>
                        <p><strong>Languages:</strong> {profile.languages}</p>
                    </div>

                    {/* Education Section */}
                    {profile.education && (
                        <div className={styles.section}>
                            <h2>Education</h2>
                            {['ug', 'college', 'school'].map((level) => (
                                profile.education[level] && (
                                    <div key={level}>
                                        <h3>{level.toUpperCase()}</h3>
                                        <p><strong>College/School:</strong> {profile.education[level].collegeName || profile.education[level].schoolName}</p>
                                        <p><strong>Passout Year:</strong> {profile.education[level].passoutyear}</p>
                                        <p><strong>CGPA:</strong> {profile.education[level].cgpa}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}

                    {/* Skills Section */}
                    {profile.skills && (
                        <div className={styles.section}>
                            <h2>Skills</h2>
                            <ul>
                                {profile.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Experience Section */}
                    {profile.experience && (
                        <div className={styles.section}>
                            <h2>Experience</h2>
                            {profile.experience.length > 0 ? (
                                profile.experience.map((exp, index) => (
                                    <div key={index} className={styles.experienceItem}>
                                        <h3>{exp.role} at {exp.company}</h3>
                                        <p><strong>Duration:</strong> {exp.duration}</p>
                                        <p><strong>Salary:</strong> ₹{exp.salary}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No experience listed.</p>
                            )}
                        </div>
                    )}

                    {/* Projects Section */}
                    {profile.projects && (
                        <div className={styles.section}>
                            <h2>Projects</h2>
                            {profile.projects.length > 0 ? (
                                profile.projects.map((project, index) => (
                                    <div key={index} className={styles.projectItem}>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No projects listed.</p>
                            )}
                        </div>
                    )}

                    {/* Edit Profile Button */}
                    <button className={styles.editButton} onClick={handleEdit}>Edit Profile</button>
                </>
            )}
        </div>
    );
};

export default Profile;
