import React, { useEffect, useState } from "react";
import styles from "./Job.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/job_posts`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched job data:", data);
        setJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2 className={styles.heading}>Job Openings</h2>
        <div className={styles.jobList}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className={styles.jobCard}
                onClick={() => setSelectedJob(job)}
              >
                <div className={styles.jobHeader}>
                  <img
                    src={job.companyLogo || "default-logo.png"}
                    alt="Company Logo"
                    className={styles.companyLogo}
                  />
                  <div>
                    <h3 className={styles.jobTitle}>{job.jobTitle}</h3>
                    <p className={styles.company}>{job.companyName}</p>
                    <p className={styles.location}>
                      {job.location} | {job.workMode}
                    </p>
                  </div>
                </div>
                <p className={styles.salary}>
                  <strong>Salary:</strong> {job.salaryRange}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.loading}>Loading jobs...</p>
          )}
        </div>
      </div>

      <div className={styles.rightPanel}>
        {selectedJob ? (
          <div className={styles.jobDetails}>
            <button className={styles.closeButton} onClick={() => setSelectedJob(null)}>X</button>
            <img
              src={selectedJob.companyLogo || "default-logo.png"}
              alt="Company Logo"
              className={styles.companyLogoLarge}
            />
            <h2 className={styles.modalTitle}>{selectedJob.jobTitle}</h2>
            <p><strong>Company:</strong> {selectedJob.companyName}</p>
            <p><strong>Website:</strong> <a href={selectedJob.companyWebsite} target="_blank" rel="noopener noreferrer">{selectedJob.companyWebsite}</a></p>
            <p><strong>Location:</strong> {selectedJob.location} ({selectedJob.workMode})</p>
            <p><strong>Experience Level:</strong> {selectedJob.experienceLevel}</p>
            <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p><strong>Positions Available:</strong> {selectedJob.numberOfPositions}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salaryRange}</p>
            <p><strong>Required Skills:</strong> {selectedJob.requiredSkills.join(", ")}</p>
            <p className={styles.jobDescription}>
              <strong>Job Description:</strong> {selectedJob.jobDescription}
            </p>
            <p className={styles.companyDescription}>
              <strong>Company Description:</strong> {selectedJob.companyDescription ? selectedJob.companyDescription : "No description available"}
            </p>
            <a
              href={selectedJob.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyLink}
            >
              Apply Here
            </a>
          </div>
        ) : (
          <p className={styles.selectJobText}>Select a job to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Job;
