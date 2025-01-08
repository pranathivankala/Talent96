const mongoose = require("mongoose");

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
module.exports = mongoose.model("Job", JobSchema);
