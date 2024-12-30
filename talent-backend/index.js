const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose.connect("mongodb://localhost:27017/Talent96");

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
    fileSize: 10 * 1024 * 1024,
  },
});
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // If file is uploaded successfully, you can access it via req.file
    res.send({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    res.status(500).send("Error processing the file.");
  }
});
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
  password: { type: String, required: true, minlength: 6 }
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
app.post('/Users_Register', upload.single('resume'),
 async (req, res) => {
  const { username, email, password, mobile } = req.body;
  const resume = req.file ? req.file.path : null;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ username, email, password, mobile, resume });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully",user: savedUser });
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
// Recruiter Registration
app.post("/Recruiters_Register", async (req, res) => {
  const { fullname, companyemail, companyname, password } = req.body;

  try {
    const existingRecruiter = await Recruiter.findOne({ companyemail });
    if (existingRecruiter)
      return res.status(400).json({ message: "Email already registered" });

    const newRecruiter = new Recruiter({
      fullname,
      companyemail,
      companyname,
      password,
    });

    await newRecruiter.save();
    res.status(201).json({ message: "Recruiter registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});
// Recruiter Login
app.post("/Recruiters_Login", async (req, res) => {
  const { companyemail, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ companyemail });
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    if (recruiter.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", recruiter });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});


// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  languages: String,
  skills: [String],
  experience: [{
    company: String,
    role: String,
    duration: String,
    salary: Number,
  }],
  projects: [
    {
      title: String,
      description: String,
    },
  ],

  education: {
    ug: { collegeName: String, passoutyear: String, cgpa: String },
    college: { collegeName: String, passoutyear: String, cgpa: String },
    school: { schoolName: String, passoutyear: String, cgpa: String },
    pg: { collegeName: String, passoutyear: String, cgpa: String }, // Keep if needed
  },
  industry: String,
  role: String,
  profilePhoto: String,
  resume: String,
});

const Profile = mongoose.model("Profile", profileSchema, "Profiles");

// Route for creating a profile
app.post('/profiles', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug: Log the entire request body

    const { name, email, phone, gender, dob, languages, skills, experience, projects, education, industry, role } = req.body;
    const profilePhotoPath = req.files?.profilePhoto?.[0]?.path || null;
    const resumePath = req.files?.resume?.[0]?.path || null;
    const ParsedSkills = skills ? JSON.parse(skills) : []; // Provide default empty array
        const ParsedExperience = experience ? JSON.parse(experience) : []; // Provide default empty array
        const ParsedProjects = projects ? JSON.parse(projects) : []; // Provide default empty array
        const ParsedEducation = education ? JSON.parse(education) : {}; // Provide default empty object
    let parsedExperience = [];
    try {
      parsedExperience = JSON.parse(experience);
    } catch (parseError) {
      console.error("Error parsing experience:", parseError);
      return res.status(400).json({ message: "Invalid experience data provided." }); // Important error handling
    }

    let parsedSkills = [];
    try {
      parsedSkills = JSON.parse(skills)
    } catch (error) {
      console.error("Error parsing skills:", error);
      return res.status(400).json({ message: "Invalid skills data provided." });
    }

    let parsedProjects = [];
    try {
      parsedProjects = JSON.parse(projects)
    } catch (error) {
      console.error("Error parsing projects:", error);
      return res.status(400).json({ message: "Invalid projects data provided." });
    }

    let parsedEducation = [];
    try {
      parsedEducation = JSON.parse(education)
    } catch (error) {
      console.error("Error parsing education:", error);
      return res.status(400).json({ message: "Invalid education data provided." });
    }

    const newProfile = new Profile({
      name, email, phone, gender, dob, languages,
      skills: parsedSkills,
      experience: parsedExperience, // Use the parsed experience
      projects: parsedProjects,
      education: parsedEducation,
      industry, role,
      profilePhoto: profilePhotoPath,
      resume: resumePath,
    });

    const savedProfile = await newProfile.save();
    res.status(200).json({ message: 'Profile created successfully!', profile: savedProfile }); // Send back the saved profile

  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ message: 'Failed to create profile.', error: err.message });
  }
});
// Backend (Example using Express.js and query parameters)
app.get('/profiles', async (req, res) => {
  try {
      const emailToFind = req.query.email?.toLowerCase(); // Use optional chaining and lowercase
      if (!emailToFind) {
          return res.status(400).json({ message: "Email is required" });
      }
      const profile = await Profile.findOne({ email: emailToFind });
      if (!profile) {
          return res.status(200).json(null); // Return null if profile not found
      }
      res.json(profile);
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
  }
});

app.put('/profiles', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
      const email = req.query.email?.toLowerCase();
      if (!email) {
          return res.status(400).json({ message: "Email is required for update" });
      }
      // ... Update profile logic using email
      const updatedProfile = await Profile.findOneAndUpdate({ email }, updateData, { new: true });
      if (!updatedProfile) {
          return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(updatedProfile);
  } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
  }
});


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
