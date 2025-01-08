const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
  resume: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
