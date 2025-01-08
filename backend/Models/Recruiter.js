const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  companyemail: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  companyname: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 }
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
