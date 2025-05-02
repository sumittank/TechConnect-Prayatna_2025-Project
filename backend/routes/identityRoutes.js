const express = require("express");
const mongoose = require("mongoose");
const Identity = require("../models/Identity");

const router = express.Router();

/**
 * @route   POST /api/verify-identity
 * @desc    Verify Aadhaar Number from Database
 * @access  Public
 */
router.post("/verify-identity", async (req, res) => {
    try {
        let { aadhaarNumber } = req.body;
        
        if (!aadhaarNumber) {
            return res.status(400).json({ success: false, message: "❌ Aadhaar Number is required" });
        }

       
        aadhaarNumber = aadhaarNumber.toString().trim();
        console.log("🔍 Searching Aadhaar:", aadhaarNumber, "Type:", typeof aadhaarNumber);

        
        const record = await Identity.findOne({ aadhaarNumber: aadhaarNumber });

        console.log("📌 Query Result:", record);

        if (record) {
            return res.json({ 
                success: true, 
                message: `✅ Verified: ${record.name}, ${record.gender}`, 
                data: record 
            });
        } else {
            return res.json({ success: false, message: "❌ Aadhaar Number Not Found in Database" });
        }
    } catch (error) {
        console.error("⚠️ Error fetching Aadhaar:", error);
        res.status(500).json({ success: false, message: "❌ Server Error" });
    }
});

module.exports = router;
