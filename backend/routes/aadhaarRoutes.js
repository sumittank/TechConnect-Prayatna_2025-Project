const express = require("express");
const multer = require("multer");
const path = require("path");
const { validateAadhaar } = require("../controllers/aadhaarController");
const Aadhaar = require("../models/Aadhaar");

const router = express.Router();


const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});
const upload = multer({ storage });


router.post("/validate-aadhaar", upload.single("aadhaarImage"), validateAadhaar);

router.post("/verify-aadhaar", async (req, res) => {
    try {
        let { aadhaarNumber } = req.body;
        if (!aadhaarNumber) {
            return res.json({ success: false, message: "❌ Aadhaar Number is required" });
        }

        aadhaarNumber = aadhaarNumber.replace(/\s/g, "");
        console.log("🔍 Searching Aadhaar:", aadhaarNumber, "Type:", typeof aadhaarNumber);


        const record = await Aadhaar.findOne({ aadhaarNumber: aadhaarNumber.toString() });
        const record1 = await Aadhaar.findOne({ gender: "Female" });
        console.log(record1)

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
