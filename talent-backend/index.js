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

app.listen(3001, () => {
  console.log("Server is running ....");
});
