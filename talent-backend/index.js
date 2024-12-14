const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Middleware configuration
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// MongoDB connection
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

// Recruiter schema and model
const RecruiterSchema = new mongoose.Schema({
  fullname: String,
  companyemail: { type: String, unique: true },
  companyname: String,
  password: String,
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema, "Recruiters_Register");

// Job schema and model
const JobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    workMode: { type: String, required: true },
    numberOfPositions: { type: Number, required: true },
    companyName: { type: String, required: true },
    companyWebsite: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    companyLogo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    companyDescription: { type: String, required: true },
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

// User routes
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

app.post("/Users_Register", upload.single("resume"), (req, res) => {
  const { username, email, password, mobile } = req.body;
  const resume = req.file ? req.file.buffer.toString('base64') : null; // Convert resume to base64

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

// Recruiter routes
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

// Job routes
app.post("/job_posts", (req, res) => {
  const newJob = new Job(req.body);

  newJob
    .save()
    .then(() => res.status(201).json({ message: "Job post added successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/job_posts", (req, res) => {
  Job.find()
    .then((jobs) => res.status(200).json(jobs))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/job_posts/:id", (req, res) => {
  Job.findById(req.params.id)
    .then((job) => {
      if (!job) return res.status(404).json({ message: "Job post not found" });
      res.status(200).json(job);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/job_posts/:id", (req, res) => {
  Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((updatedJob) => {
      if (!updatedJob) return res.status(404).json({ message: "Job post not found" });
      res.json({ message: "Job post updated successfully", updatedJob });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/job_posts/:id", (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then((deletedJob) => {
      if (!deletedJob) return res.status(404).json({ message: "Job post not found" });
      res.json({ message: "Job post deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running ....");
});
