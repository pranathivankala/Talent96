const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());

//  Connection
mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

const JobSchema = new mongoose.Schema({
  jobTitle: String,
  jobDescription: String,
  jobType: String,
  location: String,
  workMode: String,
  numberOfPositions: Number,
  companyName: String,
  companyWebsite: String,
  companyLogo: String,
  companyDescription: String,
  requiredSkills: [String],
  experienceLevel: String,
  salaryRange: String,
  applicationLink: String,
});

const Job = mongoose.model('Job', JobSchema);

app.post('/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
