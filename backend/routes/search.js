const express = require("express");
const mongoose = require("mongoose"); 
const router = express.Router();
const User = require("../models/User");
const Application = require("../models/Application");

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    let applicationQuery = [
      { ownerName: { $regex: query, $options: "i" } },
      { businessName: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } }
    ];


    if (mongoose.Types.ObjectId.isValid(query)) {
      applicationQuery.push({ _id: query });
    }


    const applicationResults = await Application.find({
      $or: applicationQuery
    }).limit(10);


    const userResults = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).limit(10);

    const results = [
      ...userResults.map(user => ({ name: user.name, email: user.email, type: "User" })),
      ...applicationResults.map(app => ({ applicationId: app._id, ownerName: app.ownerName, businessName: app.businessName, email: app.email, type: "Application" }))
    ];

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

module.exports = router;
