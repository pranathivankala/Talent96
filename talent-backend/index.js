const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const axios = require('axios');


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose.connect("mongodb://localhost:27017/Talent96", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  resume: String,  
});

const User = mongoose.model("User", UserSchema, "Users_Register");

const RecruiterSchema = new mongoose.Schema({
  fullname: String,
  companyemail: { type: String, unique: true },
  companyname: String,
  password: String,
  companyLogo: String,  
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema, "Recruiters_Register");

const JobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: false },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    workMode: { type: String, required: true },
    numberOfPositions: { type: Number, required: true },
    companyName: { type: String, required: false },
    companyWebsite: { 
      type: String, 
      required: false, 
      validate: {
        validator: function(v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    companyLogo: { 
      type: String, 
      required: false, 
      validate: {
        validator: function(v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },    
    companyDescription: { type: String, required: false },
    requiredSkills: { type: [String], required: true },
    experienceLevel: { type: String, required: true },
    salaryRange: { type: String, required: true },
    applicationLink: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema, "Job_Posts");

// Job Application Schema
const ApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    resume: { type: String, required: true },
    coverLetter: String, 
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema, "Job_Applications");

// User Login
app.post("/Users_Login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid password" });
      }

      res.json({ message: "Login successful" });
    })
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
});

// User Registration
app.post("/Users_Register", upload.single("resume"), (req, res) => {
  const { username, email, password, mobile } = req.body;
  const resume = req.file ? req.file.buffer.toString('base64') : null;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const newUser = new User({ username, email, password, mobile, resume });

      newUser
        .save()
        .then(() => res.json({ message: "Registration successful" }))
        .catch((err) =>
          res.status(400).json({ message: "Error registering user", error: err })
        );
    })
    .catch((err) => res.status(500).json({ message: "Internal server error", error: err }));
});

// Recruiter Login
app.post("/Recruiters_Login", (req, res) => {
  const { companyemail, password } = req.body;

  Recruiter.findOne({ companyemail })
    .then((recruiter) => {
      if (!recruiter) {
        return res.status(400).json({ message: "Recruiter not found" });
      }

      if (recruiter.password !== password) {
        return res.status(400).json({ message: "Invalid password" });
      }

      res.json({ message: "Login successful" });
    })
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
});

// Recruiter Registration
app.post("/Recruiters_Register", (req, res) => {
  const { fullname, companyemail, companyname, password } = req.body;

  Recruiter.findOne({ companyemail })
    .then((existingRecruiter) => {
      if (existingRecruiter) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const newRecruiter = new Recruiter({
        fullname,
        companyemail,
        companyname,
        password,
      });

      newRecruiter
        .save()
        .then(() => res.json({ message: "Registration successful" }))
        .catch((err) =>
          res.status(400).json({
            message: "Error registering recruiter",
            error: err,
          })
        );
    })
    .catch((err) => res.status(500).json({ message: "Internal server error", error: err }));
});

// Job Posting
app.post('/job_posts', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: 'Job post added successfully' });
  } catch (err) {
    console.error('Error posting job:', err);  // Log the error to server console
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});




// Get All Job Posts with Filtering
app.get("/job_posts", (req, res) => {
  const { location, jobType, salaryRange } = req.query;

  let query = {};

  if (location) query.location = location;
  if (jobType) query.jobType = jobType;
  if (salaryRange) query.salaryRange = { $gte: salaryRange };

  Job.find(query)
    .then((jobs) => res.status(200).json(jobs))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get Specific Job Post by ID
app.get("/job_posts/:id", (req, res) => {
  Job.findById(req.params.id)
    .then((job) => {
      if (!job) return res.status(404).json({ message: "Job post not found" });
      res.status(200).json(job);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Update Job Post
app.put("/job_posts/:id", (req, res) => {
  Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((updatedJob) => {
      if (!updatedJob) return res.status(404).json({ message: "Job post not found" });
      res.json({ message: "Job post updated successfully", updatedJob });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete Job Post
app.delete("/job_posts/:id", (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then((deletedJob) => {
      if (!deletedJob) return res.status(404).json({ message: "Job post not found" });
      res.json({ message: "Job post deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Job Application
app.post("/apply_for_job/:jobId", upload.single("resume"), (req, res) => {
  const { userId, coverLetter } = req.body;
  const resume = req.file ? req.file.buffer.toString('base64') : null;
  const { jobId } = req.params;

  const application = new Application({ userId, jobId, resume, coverLetter });

  application
    .save()
    .then(() => res.status(201).json({ message: "Application submitted successfully" }))
    .catch((err) => res.status(500).json({ message: "Error submitting application", error: err }));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
