const Inspection = require("../models/Inspection");
const Application = require("../models/Application");

// ✅ Fetch all inspections where requiresInspection = true
const getAllInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find({ requiresInspection: true });
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get inspection details by application ID
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

// ✅ Create or Update Inspection
// const createOrUpdateInspection = async (req, res) => {
//   try {
//     const { applicationId, requiresInspection, reason, inspector, date, time } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ message: "Application ID is required" });
//     }

//     let inspection = await Inspection.findOne({ applicationId });

//     if (inspection) {
//       inspection.requiresInspection = requiresInspection;
//       inspection.reason = reason;
//       inspection.inspector = inspector;
//       inspection.date = date;
//       inspection.time = time;
//       await inspection.save();
//     } else {
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
//     res.status(500).json({ message: "Server Error" });
//   }
// };

const createOrUpdateInspection = async (req, res) => {
    try {
      const { applicationId, requiresInspection, reason, inspector, date, time } = req.body;
  
      if (!applicationId) {
        return res.status(400).json({ message: "Application ID is required" });
      }
  
      let inspection = await Inspection.findOne({ applicationId });
  
      if (inspection) {
        // ✅ Update existing record
        inspection.requiresInspection = requiresInspection;
        inspection.reason = reason;
        inspection.inspector = inspector;
        inspection.date = date;
        inspection.time = time;
        inspection.status = requiresInspection ? "pending" : "completed"; // ✅ Fix status based on checkbox
        await inspection.save();
      } else {
        // ✅ Create new record
        inspection = new Inspection({
          applicationId,
          requiresInspection,
          reason,
          inspector,
          date,
          time,
          status: requiresInspection ? "pending" : "completed", // ✅ Fix status based on checkbox
        });
        await inspection.save();
      }
  
      res.status(200).json({ message: "Inspection saved successfully", inspection });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// ✅ Update inspection status
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

// ✅ Mark inspection as finalized
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


// ✅ Fetch inspections for a specific user based on email
const inspectionForParticularUser = async (req,res) => {
    try {
        const { email } = req.query;
    
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }
    
        // 🔹 Step 1: Find applications linked to the email
        const applications = await Application.find({ email });
    
        if (!applications.length) {
          return res.status(404).json({ message: "No applications found for this user." });
        }
    
        // 🔹 Step 2: Extract all `_id` values from applications
        const applicationIds = applications.map(app => app._id);
    
        // 🔹 Step 3: Find inspections where `applicationId` matches any of the `_id`s
        const inspections = await Inspection.find({ applicationId: { $in: applicationIds } });
    
        // 🔹 Step 4: Return inspections (empty array if none found)
        res.status(200).json({ inspections });
    
      } catch (error) {
        console.error("Error fetching inspections:", error);
        res.status(500).json({ message: "Error fetching inspections", error });
      }
}

module.exports = { getAllInspections, getInspectionById, createOrUpdateInspection, updateInspectionStatus ,  finalizeInspectionStatus , inspectionForParticularUser};
