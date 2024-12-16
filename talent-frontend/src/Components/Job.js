import React, { useState } from "react";
import styles from "./Job.module.css";
import { useEffect } from "react";

const jobPostings = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    jobDescription:
      "Develop interactive and responsive UI components using React and CSS. Ensure cross-browser compatibility and performance optimization.",
    jobType: "Full-Time",
    numberOfPositions: "2",
    country: "India",
    city: "Hyderabad  ",
    workMode: "Remote",
    companyName: "Tech Solutions",
    companyWebsite: "https://www.techsolutions.com",
    companyLogo: null,
    companyDescription:
      "Tech Solutions is a leading software development company specializing in web and mobile applications.",
    year: "0-3",
    experienceLevel: "Mid or Fresher",
    salaryRange: "4.5LPA -7.5LAP",
    applicationLink: "https://www.techsolutions.com/careers",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    jobDescription:
      "Design and build scalable APIs using Node.js. Work on database design, server-side logic, and integration with third-party systems.",
    jobType: "Full-Time",
    numberOfPositions: "1",
    country: "India",
    city: "Chennai",
    workMode: "Hybrid",
    companyName: "Innovative Systems",
    companyWebsite: "https://www.innovatiesystems.com",
    companyLogo: null,
    companyDescription:
      "Innovative Systems provides enterprise-level backend solutions for growing businesses.",
    year: "4+",
    experienceLevel: "Senior",
    salaryRange: "7.5LPA -12LAP",
    applicationLink: "https://www.inovativesystems.com/careers",
  },
  {
    id: 3,
    jobTitle: "Full Stack Developer",
    jobDescription:
      "Work on the MERN stack to develop and maintain both frontend and backend systems. Build efficient and secure web applications.",
    jobType: "Internship",
    numberOfPositions: "3",
    country: "India",
    city: "Bangalore",
    workMode: "On-site",
    companyName: "Global Tech",
    companyWebsite: "https://www.gloaltech.com",
    companyLogo: null,
    companyDescription:
      "Global Tech is a multinational corporation building cutting-edge software solutions for clients worldwide.",
    year: "0-1",
    experienceLevel: "Fresher",
    salaryRange: "4.5LPA",
    applicationLink: "https://www.glbaltech.com/careers",
  },
];

export const Job = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setSelectedJob(jobPostings[0]);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  return (
    <div className={styles.container}>
      {/* Left Panel: Job Postings List */}
      <div className={styles.leftPanel}>
        <h1 className={styles.heading}>Job Postings</h1>
        <div className={styles.jobList}>
          {jobPostings.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <h2 className={styles.jobTitle}>{job.jobTitle}</h2>
              <p className={styles.company}>{job.companyName}</p>
              <p className={styles.location}>{job.city}, {job.country}</p>
              <p className={styles.salary}>{job.salaryRange}</p>
              <p className={styles.description}>{job.jobDescription}</p>
              <button
                className={styles.applyButton}
                onClick={() => handleApplyClick(job)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Job Details */}
      {selectedJob && (
        <div className={styles.rightPanel}>
          <div className={styles.jobDetails}>
            <button className={styles.closeButton} onClick={handleClose}>
              &times;
            </button>
            <h2 className={styles.modalTitle}>{selectedJob.jobTitle}</h2>
            <p><strong>Company:</strong> {selectedJob.companyName}</p>
            <p><strong>Location:</strong> {selectedJob.city}, {selectedJob.country}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salaryRange}</p>
            <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p><strong>Work Mode:</strong> {selectedJob.workMode}</p>
            <p><strong>Number of Positions:</strong> {selectedJob.numberOfPositions}</p>
            <p><strong>Description:</strong> {selectedJob.jobDescription}</p>
            <p><strong>Experience Level:</strong> {selectedJob.experienceLevel}</p>
            <p><strong>Years of Experience:</strong> {selectedJob.year}+ </p>
            <p>
              <strong>Application Link:</strong> 
              <a href={selectedJob.applicationLink} target="_blank" rel="noopener noreferrer">
                Apply Here
              </a>
            </p>
            <p><strong>Company Description:</strong> {selectedJob.companyDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;
