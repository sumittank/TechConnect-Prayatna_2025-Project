const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Application = require("../models/Application");
const Inspection = require("../models/Inspection");
const Noc = require("../models/NOC");


router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalInspections = await Inspection.countDocuments();
    const totalNocs = await Noc.countDocuments();

    res.status(200).json({
      totalUsers,
      totalApplications,
      totalInspections,
      totalNocs,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
