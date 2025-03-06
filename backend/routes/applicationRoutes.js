// const express = require("express");
// const Application = require("../models/Application");
// const upload = require("../middleware/upload");

// const router = express.Router();

// router.post(
//   "/apply",
//   upload.fields([
//     { name: "ownerPhoto" },
//     { name: "buildingPhoto" },
//     { name: "extinguisherPhoto" },
//     { name: "businessCert" },
//     { name: "aadharCard" },
//   ]),
//   async (req, res) => {
//     try {
//       const application = new Application({
//         ...req.body,
//         documents: req.files,
//       });

//       await application.save();
//       res.status(201).json({ message: "Application submitted successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error submitting application", error });
//     }
//   }
// );

// // Fetch applications for a specific user
// router.get("/applications", async (req, res) => {
//     try {
//       const { email } = req.query;
//       if (!email) {
//         return res.status(400).json({ message: "Email is required" });
//       }
  
//       const applications = await Application.find({ email });
//       res.status(200).json(applications);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching applications", error });
//     }
//   });
  

// module.exports = router;


const express = require("express");
const Application = require("../models/Application");
const upload = require("../middleware/upload");
const axios = require("axios");

const router = express.Router();

// ✅ Submit a new application
// router.post(
//   "/apply",
//   upload.fields([
//     { name: "ownerPhoto", maxCount: 1 },
//     { name: "buildingPhoto", maxCount: 1 },
//     { name: "extinguisherPhoto", maxCount: 1 },
//     { name: "businessCert", maxCount: 1 },
//     { name: "aadharCard", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       // ✅ Extract files correctly
//       const uploadedFiles = {};
//       Object.keys(req.files).forEach((key) => {
//         uploadedFiles[key] = req.files[key][0];
//       });

//       const application = new Application({
//         ...req.body,
//         documents: uploadedFiles,
//       });
//       console.log(req)
//       await application.save();
//       res.status(201).json({ message: "Application submitted successfully", application });
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       res.status(500).json({ message: "Error submitting application", error });
//     }
//   }
// );
// router.post(
//     "/apply",
//     upload.fields([
//       { name: "ownerPhoto", maxCount: 1 },
//       { name: "buildingPhoto", maxCount: 1 },
//       { name: "extinguisherPhoto", maxCount: 1 },
//       { name: "businessCert", maxCount: 1 },
//       { name: "aadharCard", maxCount: 1 },
//     ]),
//     async (req, res) => {
//       try {
//         console.log("Received Data:", req.body);
//         console.log("Uploaded Files:", req.files);
  
//         // ✅ Convert `req.body` values correctly
//         const buildingDetails = req.body.buildingDetails
//           ? JSON.parse(req.body.buildingDetails)
//           : {};
  
//         const fireSafetyMeasures = req.body.fireSafetyMeasures
//           ? JSON.parse(req.body.fireSafetyMeasures)
//           : [];
  
//         // ✅ Correct file handling
//         const uploadedFiles = {};
//         Object.keys(req.files).forEach((key) => {
//           uploadedFiles[key] = req.files[key][0].path; // Store only file path (or URL if using Cloudinary)
//         });

  
//         // ✅ Create new application
//         const application = new Application({
//           ownerName: req.body.ownerName,
//           email: req.body.email,
//           contact: req.body.contact,
//           address: req.body.address,
//           remark : "",
//           inspectionStatus : false,
//           status: req.body.status || "Pending",
//           buildingDetails,
//           fireSafetyMeasures,
//           waterStorage: req.body.waterStorage,
//           nearestFireStation: req.body.nearestFireStation,
//           documents: uploadedFiles,
//         });
  
//         await application.save();
//         res.status(201).json({ message: "Application submitted successfully", application });
//       } catch (error) {
//         console.error("Error submitting application:", error);
//         res.status(500).json({ message: "Error submitting application", error });
//       }
//     }
//   );
router.post(
    "/apply",
    upload.fields([
      { name: "ownerPhoto", maxCount: 1 },
      { name: "buildingPhoto", maxCount: 1 },
      { name: "extinguisherPhoto", maxCount: 1 },
      { name: "businessCert", maxCount: 1 },
      { name: "aadharCard", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        console.log("Received Data:", req.body);
        console.log("Uploaded Files:", req.files);
  
        const buildingDetails = req.body.buildingDetails
          ? JSON.parse(req.body.buildingDetails)
          : {};
  
        const fireSafetyMeasures = req.body.fireSafetyMeasures
          ? JSON.parse(req.body.fireSafetyMeasures)
          : [];
  
        const uploadedFiles = {};
        Object.keys(req.files).forEach((key) => {
          uploadedFiles[key] = req.files[key][0].path;
        });
  
        const application = new Application({
          ownerName: req.body.ownerName,
          email: req.body.email,
          contact: req.body.contact,
          address: req.body.address,
          businessName: req.body.businessName, // ✅ New field
          submittedAt: new Date(), // ✅ Auto-generated timestamp
          remark: "",
          inspectionStatus: false,
          status: req.body.status || "Pending",
          buildingDetails,
          fireSafetyMeasures,
          waterStorage: req.body.waterStorage,
          nearestFireStation: req.body.nearestFireStation,
          documents: uploadedFiles,
        });
  
        await application.save();
        res.status(201).json({ message: "Application submitted successfully", application });
      } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ message: "Error submitting application", error });
      }
    }
  );
  

// ✅ Fetch applications for a specific user
router.get("/applications", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const applications = await Application.find({ email });

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

// ✅ Get all applications (For Fire Officers)
router.get("/all-applications", async (req, res) => {
    try {
      const applications = await Application.find();
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications", error });
    }
  });
// Get single application by ID
router.get("/application/:id", async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ message: "Error fetching application", error });
    }
  });

  router.put("/:id/status", async (req, res) => {
    const { status, remark } = req.body;

    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        application.remark = remark; // Save the remark
        await application.save();

        res.json({ message: "Status updated successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
});

// ✅ Update inspectionStatus for a specific application
router.put("/application/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { inspectionStatus } = req.body; // Get new status from request

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { inspectionStatus: inspectionStatus },
            { new: true } // Return updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(updatedApplication);
    } catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Update Status and Remark of an Application
router.put("/application/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remark } = req.body; // Get status & remark from request

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status: status, remark: remark }, // ✅ Update status & remark
            { new: true } // Return updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(updatedApplication);
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Fetch all approved applications
router.get("/approved-applications", async (req, res) => {
    try {
      const approvedApplications = await Application.find({ status: "Approved" });
      res.status(200).json(approvedApplications);
    } catch (error) {
      console.error("Error fetching approved applications:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
// Route to call Flask API for risk prediction
// router.post("/predict-risk", async (req, res) => {
//     try {
//         const flaskResponse = await axios.post("http://localhost:5001/api/predict-risk", req.body);
//         res.json(flaskResponse.data);
//     } catch (error) {
//         res.status(500).json({ error: "ML Model Error" });
//     }
// })

// ✅ Route to predict risk score using Flask API
// ✅ Predict Risk Score & Update in DB
router.post("/predict-risk", async (req, res) => {
    try {
      const { applicationId, riskScore } = req.body;
  
      const application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ message: "Application not found" });
  
      application.riskScore = riskScore; // Store the predicted value
      await application.save();
  
      res.json({ message: "Risk Score updated successfully", riskScore });
    } catch (error) {
      res.status(500).json({ message: "Error updating risk score", error });
    }
  });

module.exports = router;
