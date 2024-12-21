const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type'],  
}));

mongoose.connect("mongodb://localhost:27017/Talent96", { useNewUrlParser: true, useUnifiedTopology: true })

const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  resume: String,
});

const User = mongoose.model("User", UserSchema, "Users_Register");

// Login Logic
app.post("/Users_Login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.json({ message: "Login successful" });
  }).catch((err) => res.status(500).json({ message: "Internal server error" }));
});

// Register Logic
app.post("/Users_Register", upload.single("resume"), (req, res) => {
  const { username, email, password, mobile } = req.body;
  const resume = req.file ? req.file.path : null;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const newUser = new User({
        username,
        email,
        password,
        mobile,
        resume,
      });

      newUser
        .save()
        .then(() => res.json({ message: "Registration successful" }))
        .catch((err) => res.status(400).json({ message: "Error registering user", error: err }));
    })
    .catch((err) => res.status(500).json({ message: "Internal server error", error: err }));
});

// Recruiter Schema
const RecruiterSchema = new mongoose.Schema({
  fullname: String,
  companyemail: { type: String, unique: true },
  companyname: String,
  password: String,
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema, "Recruiters_Register");

// Recruiter Login Logic
app.post("/Recruiters_Login", (req, res) => {
  const { companyemail, password } = req.body;

  Recruiter.findOne({ companyemail }).then((recruiter) => {
    if (!recruiter) {
      return res.status(400).json({ message: "Recruiter not found" });
    }

    if (recruiter.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.json({ message: "Login successful" });
  }).catch((err) => res.status(500).json({ message: "Internal server error" }));
});

// Recruiter Registration Logic
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
        .catch((err) => res.status(400).json({ message: "Error registering recruiter", error: err }));
    })
    .catch((err) => res.status(500).json({ message: "Internal server error", error: err }));
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
});
