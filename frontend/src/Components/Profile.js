import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';
import { UserContext } from './UserContext';

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
    const { userData } = useContext(UserContext);
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
                console.log("Fetching profile for:", userData.email);
                const response = await axios.get(`${API_URL}/api/profiles?email=${userData.email}`);
                
                if (response.data) {
                    console.log("Profile data:", response.data);
                    setProfile(response.data);
                } else {
                    setError("Profile not found. Please create a profile.");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                if (err.response) {
                    setError(`Error: ${err.response.status} - ${err.response.data.message || "An error occurred"}`);
                } else {
                    setError("Failed to fetch profile. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, [userData]);

    if (loading) {
        return <div className={styles.loading}>Loading profile...</div>;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button className={styles.retryButton} onClick={() => window.location.reload()}>Retry</button>
                <button className={styles.createButton} onClick={() => navigate('/profiles/create')}>Create Profile</button>
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
                    <h1 className={styles.heading}>My Profile</h1>

                    {/* Personal Information */}
                    <div className={styles.section}>
                        <h2>Personal Information</h2>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Gender:</strong> {profile.gender}</p>
                        <p><strong>Date of Birth:</strong> {profile.dob}</p>
                        <p><strong>Languages:</strong> {profile.languages}</p>
                    </div>

                    {/* Education */}
                    {profile.education && (
                        <div className={styles.section}>
                            <h2>Education</h2>
                            {['ug', 'college', 'school'].map((level) => (
                                profile.education[level] && (
                                    <div key={level}>
                                        <h3>{level.toUpperCase()}</h3>
                                        <p><strong>College/School:</strong> {profile.education[level]?.collegeName || profile.education[level]?.schoolName || 'N/A'}</p>
                                        <p><strong>Passout Year:</strong> {profile.education[level]?.passoutyear || 'N/A'}</p>
                                        <p><strong>CGPA:</strong> {profile.education[level]?.cgpa || 'N/A'}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}

                    {/* Skills */}
                    {profile.skills && (
                        <div className={styles.section}>
                            <h2>Skills</h2>
                            {profile.skills.length > 0 ? (
                                <ul>
                                    {profile.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No skills listed.</p>
                            )}
                        </div>
                    )}

                    {/* Experience */}
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

                    {/* Projects */}
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
                    <button className={styles.editButton} onClick={handleEdit}>Edit Profile</button>
                </>
            )}
        </div>
    );
};

export default Profile;
