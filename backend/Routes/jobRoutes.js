const express = require('express');
const Job = require('../Models/Job');
const router = express.Router();


// Create Job Posting
router.post("/job_posts", async (req, res) => {
    console.log("Request Body:", req.body);
    try {
      const job = new Job(req.body);
      await job.save();
      res.status(201).json({ message: "Job posted successfully", job });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(400).json({ message: "Error posting job", error: err.message });
    }
  });
  // Fetch All Jobs
router.get("/job_posts", async (req, res) => {
    try {
      const jobs = await Job.find(req.query);
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
  });
  
module.exports = router;
