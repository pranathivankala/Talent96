const mongoose = require("mongoose");

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

module.exports = mongoose.model("Profile", profileSchema);
