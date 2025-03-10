const express = require("express");
const User = require("../Models/User");
const upload = require("../config/multerConfig");
const router = express.Router();

// Register User
router.post('/Users_Register', upload.single('resume'),
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
router.post("/Users_Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) return res.status(400).json({ message: "Invalid password" });
    const profile = await Profile.findOne({ email });

    res.status(200).json({ message: "Login successful", user,profileCompleted: profile ? true : false  });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
