require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db"); 
const jobRoutes = require("./Routes/jobRoutes"); 
const profileRoutes = require("./Routes/profileRoutes");
const recruiterRoutes = require("./Routes/recruiterRoutes"); 
const userRoutes = require("./Routes/userRoutes"); 

const app = express();


app.use(express.json()); 
app.use(cors()); 

connectDB();

app.use("/api", jobRoutes);
app.use("/api", profileRoutes);
app.use("/api", recruiterRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
