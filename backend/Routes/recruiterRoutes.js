const express = require("express");
const Recruiter = require("../Models/Recruiter");
const router = express.Router();

// Register Recruiter
router.post("/Recruiters_Register", async (req, res) => {
    const { fullname, companyemail, companyname, password } = req.body;

    try {
        const existingRecruiter = await Recruiter.findOne({ companyemail });
        if (existingRecruiter)
            return res.status(400).json({ message: "Email already registered" });

        const newRecruiter = new Recruiter({
            fullname,
            companyemail,
            companyname,
            password,
        });

        await newRecruiter.save();
        res.status(201).json({ message: "Recruiter registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});
// Recruiter Login
router.post("/Recruiters_Login", async (req, res) => {
    const { companyemail, password } = req.body;

    try {
        const recruiter = await Recruiter.findOne({ companyemail });
        if (!recruiter)
            return res.status(404).json({ message: "Recruiter not found" });

        if (recruiter.password !== password)
            return res.status(400).json({ message: "Invalid password" });

        res.status(200).json({ message: "Login successful", recruiter });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});


module.exports = router;
