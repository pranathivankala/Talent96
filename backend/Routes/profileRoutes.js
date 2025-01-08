const express = require("express");
const Profile = require("../Models/Profile");
const upload = require("../config/multerConfig");
const router = express.Router();

// Create Profile
router.post('/profiles', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
    console.log("Request body:", req.body); 

    const { name, email, phone, gender, dob, languages, skills, experience, projects, education, industry, role } = req.body;
    const profilePhotoPath = req.files?.profilePhoto?.[0]?.path || null;
    const resumePath = req.files?.resume?.[0]?.path || null;
    const ParsedSkills = skills ? JSON.parse(skills) : []; 
        const ParsedExperience = experience ? JSON.parse(experience) : []; 
        const ParsedProjects = projects ? JSON.parse(projects) : []; 
        const ParsedEducation = education ? JSON.parse(education) : {}; 
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
      experience: parsedExperience, 
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
router.get('/profiles', async (req, res) => {
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

router.put('/profiles', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
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

module.exports = router;
