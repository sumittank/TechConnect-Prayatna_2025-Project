const express = require("express");
const multer = require("multer");
const path = require("path");
const { validateAadhaar } = require("../controllers/aadhaarController");
const Aadhaar = require("../models/Aadhaar");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});
const upload = multer({ storage });

// Aadhaar validation endpoint
router.post("/validate-aadhaar", upload.single("aadhaarImage"), validateAadhaar);

// // ✅ Verify Aadhaar Number
// router.get("/:aadhaarNumber", async (req, res) => {
//     try {
//       const { aadhaarNumber } = req.params;
//       const record = await Aadhaar.findOne({ aadhaarNumber });
  
//       if (record) {
//         return res.json({ success: true, data: record });
//       } else {
//         return res.json({ success: false, message: "❌ Aadhaar Number Not Found" });
//       }
//     } catch (error) {
//       console.error("Error fetching Aadhaar:", error);
//       res.status(500).json({ success: false, message: "❌ Server Error" });
//     }
//   });


// ✅ Verify Aadhaar Number
// router.get("/verify-aadhaar/:aadhaarNumber", async (req, res) => {
//     try {
//         let { aadhaarNumber } = req.params;
//         aadhaarNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces

//         const record = await Aadhaar.findOne({ aadhaarNumber });

//         if (record) {
//             return res.json({ 
//                 success: true, 
//                 message: `✅ Verified: ${record.name}, ${record.gender}`, 
//                 data: record 
//             });
//         } else {
//             return res.json({ success: false, message: "❌ Aadhaar Number Not Found in Database" });
//         }
//     } catch (error) {
//         console.error("Error fetching Aadhaar:", error);
//         res.status(500).json({ success: false, message: "❌ Server Error" });
//     }
// });

// module.exports = router;

// router.post("/verify-aadhaar", async (req, res) => {
//     try {
//         let { aadhaarNumber } = req.body;
//         if (!aadhaarNumber) {
//             return res.json({ success: false, message: "❌ Aadhaar Number is required" });
//         }

//         aadhaarNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces
//         {console.log("hi",typeof(aadhaarNumber))}
//         const record = await Aadhaar.findOne({ aadhaarNumber });
//         {console.log("hi1",record)}

//         if (record) {
//             return res.json({ 
//                 success: true, 
//                 message: `✅ Verified: ${record.name}, ${record.gender}`, 
//                 data: record 
//             });
//         } else {
//             return res.json({ success: false, message: "❌ Aadhaar Number Not Found in Database" });
//         }
//     } catch (error) {
//         console.error("Error fetching Aadhaar:", error);
//         res.status(500).json({ success: false, message: "❌ Server Error" });
//     }
// });


// router.post("/verify-aadhaar", async (req, res) => {
//     try {
//         console.log("Received Body:", req.body); // ✅ Check if request body is received

//         let { aadhaarNumber } = req.body;
//         if (!aadhaarNumber) {
//             return res.json({ success: false, message: "❌ Aadhaar Number is required" });
//         }

//         aadhaarNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces
//         console.log("Formatted Aadhaar Number:", aadhaarNumber); // ✅ Check if aadhaarNumber is properly formatted

//         const record = await Aadhaar.findOne({ aadhaarNumber : "630358195678" });
//         console.log("Database Query Result:", record); // ✅ Check if MongoDB returns a record

//         if (record) {
//             return res.json({ 
//                 success: true, 
//                 message: `✅ Verified: ${record.name}, ${record.gender}`, 
//                 data: record 
//             });
//         } else {
//             return res.json({ success: false, message: "❌ Aadhaar Number Not Found in Database" });
//         }
//     } catch (error) {
//         console.error("Error fetching Aadhaar:", error);
//         res.status(500).json({ success: false, message: "❌ Server Error" });
//     }
// });

router.post("/verify-aadhaar", async (req, res) => {
    try {
        let { aadhaarNumber } = req.body;
        if (!aadhaarNumber) {
            return res.json({ success: false, message: "❌ Aadhaar Number is required" });
        }

        aadhaarNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces
        console.log("🔍 Searching Aadhaar:", aadhaarNumber, "Type:", typeof aadhaarNumber);

        // Convert to string to ensure proper comparison
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
