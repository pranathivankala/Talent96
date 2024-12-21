const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose.connect("mongodb://localhost:27017/Talent96", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
  resume: { type: String }, 
});

const User = mongoose.model("User", UserSchema, "Users_Register");

// Recruiter Schema
const RecruiterSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  companyemail: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  companyname: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  companyLogo: { type: String },
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema, "Recruiters_Register");

// Job Schema
const JobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: String,
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    workMode: { type: String, required: true, enum: ["Remote", "Onsite", "Hybrid"] },
    numberOfPositions: { type: Number, required: true, min: 1 },
    companyName: { type: String, required: true },
    companyWebsite: { type: String, match: /^https?:\/\/.+$/ },
    companyLogo: { type: String, match: /^https?:\/\/.+$/ },
    requiredSkills: { type: [String], required: true },
    experienceLevel: { type: String, required: true },
    salaryRange: { type: String, required: true },
    applicationLink: { type: String, required: true, match: /^https?:\/\/.+$/ },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema, "Job_Posts");

// Application Schema
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


// User Registration
app.post("/Users_Register", upload.single("resume"), async (req, res) => {
  const { username, email, password, mobile } = req.body;
  const resume = req.file ? req.file.buffer.toString("base64") : null;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ username, email, password, mobile, resume });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// User Login
app.post("/Users_Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

<<<<<<< HEAD
// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  languages: String,
  skills: [String],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      salary: Number
    }
  ],
  projects: [
    {
      title: String,
      description: String
    }
  ],
  education: {
    ug: { institution: String, year: String, cgpa: String },
    college: { institution: String, year: String, cgpa: String },
    school: { institution: String, year: String, cgpa: String },
    pg: { institution: String, year: String, cgpa: String }
  },
  industry: String,
  role: String,
  profilePhoto: String,
  resume: String
});

const Profile = mongoose.model('Profile', profileSchema, 'Profiles');

// Route for creating a profile
app.post('/profiles', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, email, phone, gender, dob, languages, skills, experience, projects, education, industry, role } = req.body;
    
    const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : '';
    const resume = req.files['resume'] ? req.files['resume'][0].path : '';
    
    const newProfile = new Profile({
      name,
      email,
      phone,
      gender,
      dob,
      languages,
      skills: JSON.parse(skills), // Convert stringified skills to array
      experience: JSON.parse(experience),
      projects: JSON.parse(projects),
      education: JSON.parse(education),
      industry,
      role,
      profilePhoto,
      resume
    });
    
    await newProfile.save();
    res.status(200).json({ message: 'Profile created successfully!' });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ message: 'Failed to create profile.' });
  }
});

// Endpoint to get profile data
app.get('/profiles/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Find profile by email
    const profile = await Profile.findOne({ email });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);  
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});
 
// Server Listening
app.listen(3001, () => {
  console.log("Server is running ....");
=======
// Job Posting (Recruiters)
app.post("/job_posts", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error:", err.message); 
    res.status(400).json({ message: "Error posting job", error: err.message });
  }
>>>>>>> eb3b0aaf99385e131d5652e29f97db8e25349cab
});


// Apply for a Job
app.post("/apply_for_job/:jobId", upload.single("resume"), async (req, res) => {
  const { userId, coverLetter } = req.body;
  const { jobId } = req.params;
  const resume = req.file ? req.file.buffer.toString("base64") : null;

  try {
    const application = new Application({ userId, jobId, resume, coverLetter });
    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Application failed", error: err.message });
  }
});

// Fetch All Jobs
app.get("/job_posts", async (req, res) => {
  try {
    const jobs = await Job.find(req.query);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
