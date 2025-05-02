const express = require("express");
const Application = require("../models/Application");
const upload = require("../middleware/upload");
const axios = require("axios");

const router = express.Router();

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
          businessName: req.body.businessName, 
          submittedAt: new Date(), 
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


router.get("/all-applications", async (req, res) => {
    try {
      const applications = await Application.find();
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications", error });
    }
  });

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
        application.remark = remark;
        await application.save();

        res.json({ message: "Status updated successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
});


router.put("/application/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { inspectionStatus } = req.body; 

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { inspectionStatus: inspectionStatus },
            { new: true }
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


router.put("/application/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remark } = req.body; 
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status: status, remark: remark }, 
            { new: true } 
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


router.get("/approved-applications", async (req, res) => {
    try {
      const approvedApplications = await Application.find({ status: "Approved" });
      res.status(200).json(approvedApplications);
    } catch (error) {
      console.error("Error fetching approved applications:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

router.post("/predict-risk", async (req, res) => {
    try {
      const { applicationId, riskScore } = req.body;
  
      const application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ message: "Application not found" });
  
      application.riskScore = riskScore; 
      await application.save();
  
      res.json({ message: "Risk Score updated successfully", riskScore });
    } catch (error) {
      res.status(500).json({ message: "Error updating risk score", error });
    }
  });

module.exports = router;
