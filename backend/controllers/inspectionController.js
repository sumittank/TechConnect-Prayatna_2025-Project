const Inspection = require("../models/Inspection");
const Application = require("../models/Application");

const getAllInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find({ requiresInspection: true });
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const getInspectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const inspection = await Inspection.findOne({ applicationId: id });

    if (!inspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    res.json(inspection);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const createOrUpdateInspection = async (req, res) => {
    try {
      const { applicationId, requiresInspection, reason, inspector, date, time } = req.body;
  
      if (!applicationId) {
        return res.status(400).json({ message: "Application ID is required" });
      }
  
      let inspection = await Inspection.findOne({ applicationId });
  
      if (inspection) {
        //Update existing record
        inspection.requiresInspection = requiresInspection;
        inspection.reason = reason;
        inspection.inspector = inspector;
        inspection.date = date;
        inspection.time = time;
        inspection.status = requiresInspection ? "pending" : "completed"; 
      } else {
        // Create new record
        inspection = new Inspection({
          applicationId,
          requiresInspection,
          reason,
          inspector,
          date,
          time,
          status: requiresInspection ? "pending" : "completed",
        });
        await inspection.save();
      }
  
      res.status(200).json({ message: "Inspection saved successfully", inspection });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  


const updateInspectionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInspection = await Inspection.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedInspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    res.json(updatedInspection);
  } catch (error) {
    res.status(500).json({ message: "Error updating inspection status" });
  }
};


const finalizeInspectionStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedInspection = await Inspection.findByIdAndUpdate(
        id,
        { statusFinalized: true },
        { new: true }
      );
  
      if (!updatedInspection) {
        return res.status(404).json({ message: "Inspection not found" });
      }
  
      res.json(updatedInspection);
    } catch (error) {
      res.status(500).json({ message: "Error finalizing inspection status" });
    }
  };



const inspectionForParticularUser = async (req,res) => {
    try {
        const { email } = req.query;
    
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }
    
        
        const applications = await Application.find({ email });
    
        if (!applications.length) {
          return res.status(404).json({ message: "No applications found for this user." });
        }
    

        const applicationIds = applications.map(app => app._id);
    

        const inspections = await Inspection.find({ applicationId: { $in: applicationIds } });
    

        res.status(200).json({ inspections });
    
      } catch (error) {
        console.error("Error fetching inspections:", error);
        res.status(500).json({ message: "Error fetching inspections", error });
      }
}

module.exports = { getAllInspections, getInspectionById, createOrUpdateInspection, updateInspectionStatus ,  finalizeInspectionStatus , inspectionForParticularUser};
