const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Route to fetch all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
