// const express = require("express");
// const Inspection = require("../models/Inspection");

// const router = express.Router();

// // ✅ Get inspection details or create a new one
// router.get("/:id", async (req, res) => {
//     try {
//         let inspection = await Inspection.findOne({ applicationId: req.params.id });

//         if (!inspection) {
//             // Create a new entry if not found
//             inspection = new Inspection({
//                 applicationId: req.params.id,
//                 requiresInspection: false, 
//                 reason: "",
//                 inspector: "",
//                 date: "",
//                 time: ""
//             });
//             await inspection.save();
//         }

//         res.json(inspection);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // ✅ Update inspection details
// router.post("/:id", async (req, res) => {
//     try {
//         const { requiresInspection, reason, inspector, date, time } = req.body;

//         let inspection = await Inspection.findOne({ applicationId: req.params.id });

//         if (!inspection) {
//             inspection = new Inspection({ applicationId: req.params.id });
//         }

//         // 🔹 If "No Inspection Needed" is selected, clear all fields
//         if (!requiresInspection) {
//             inspection.requiresInspection = false;
//             inspection.reason = "";
//             inspection.inspector = "";
//             inspection.date = "";
//             inspection.time = "";
//         } else {
//             inspection.requiresInspection = requiresInspection;
//             inspection.reason = reason;
//             inspection.inspector = inspector;
//             inspection.date = date;
//             inspection.time = time;
//         }

//         await inspection.save();
//         res.json({ message: "Inspection details updated successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// module.exports = router;







// const express = require("express");
// const Inspection = require("../models/Inspection"); // Ensure model is correctly imported

// const router = express.Router();

// // 🔹 GET Inspection Details by Application ID
// router.get("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       console.log(`Fetching inspection details for applicationId: ${id}`); // ✅ Debugging log
  
//       const inspection = await Inspection.findOne({ applicationId: id });
  
//       if (!inspection) {
//         console.log(`No inspection found for applicationId: ${id}`);
//         return res.status(404).json({ message: "Inspection not found" });
//       }
  
//       res.json(inspection);
//     } catch (error) {
//       console.error("Error fetching inspection:", error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   });

// // 🔹 POST Save or Update Inspection
// router.post("/", async (req, res) => {
//   try {
//     const { applicationId, requiresInspection, reason, inspector, date, time } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ message: "Application ID is required" });
//     }

//     let inspection = await Inspection.findOne({ applicationId });

//     if (inspection) {
//       // ✅ Update existing record
      
//       inspection.applicationId = applicationId;
//       inspection.requiresInspection = requiresInspection;
//       inspection.reason = reason;
//       inspection.inspector = inspector;
//       inspection.date = date;
//       inspection.time = time;
//       await inspection.save();
//     } else {
//       // ✅ Create a new inspection record
//       inspection = new Inspection({
//         applicationId,
//         requiresInspection,
//         reason,
//         inspector,
//         date,
//         time,
//       });
//       await inspection.save();
//     }

//     res.status(200).json({ message: "Inspection saved successfully", inspection });
//   } catch (error) {
//     console.error("Error saving inspection:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;












const express = require("express");
const { getAllInspections, getInspectionById, createOrUpdateInspection, updateInspectionStatus , finalizeInspectionStatus ,inspectionForParticularUser } = require("../controllers/inspectionController");

const router = express.Router();

router.get("/", getAllInspections);
router.get("/:id", getInspectionById);
router.post("/", createOrUpdateInspection);
router.put("/:id/status", updateInspectionStatus);
router.put("/:id/finalize", finalizeInspectionStatus);
router.get("/user/inspections", inspectionForParticularUser);



module.exports = router;
