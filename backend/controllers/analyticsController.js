const Inspection = require("../models/Inspection");
const NOC = require("../models/NOC");
const Application = require("../models/Application");

const getMonthlyAnalytics = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const allInspections = await Inspection.find({});

    
    const inspections = allInspections.filter((inspection) => {
      const inspectionDate = new Date(inspection.date); // Convert string to Date
      return inspectionDate >= firstDayOfMonth && inspectionDate <= lastDayOfMonth;
    });


    

    const totalInspections = inspections.length;
    const completedInspections = inspections.filter(i => i.status === "completed").length;
    const pendingInspections = inspections.filter(i => i.status === "pending").length;

    
    const totalApprovedNOCs = await NOC.countDocuments({
      issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });


    const riskScoreDistribution = await Application.aggregate([
        {
          $match: { submittedAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } }
        },
        {
          $addFields: {
            riskScoreNumeric: {
              $convert: {
                input: "$riskScore",
                to: "int",
                onError: 0, // If conversion fails default to 0
                onNull: 0 // If riskScore is missing, default to 0
              }
            }
          }
        },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $lte: ["$riskScoreNumeric", 20] }, then: "Low (0-20)" },
                  { case: { $lte: ["$riskScoreNumeric", 50] }, then: "Moderate (21-50)" },
                  { case: { $lte: ["$riskScoreNumeric", 80] }, then: "High (51-80)" }
                ],
                default: "Critical (81-100)"
              }
            },
            count: { $sum: 1 }
          }
        }
      ]);
      
      


    const fireSafetyMeasuresCount = await Application.aggregate([
      { $unwind: "$fireSafetyMeasures" },
      {
        $group: {
          _id: "$fireSafetyMeasures",
          count: { $sum: 1 },
        },
      },
    ]);


    const nearestFireStationData = await Application.aggregate([
      {
        $group: {
          _id: "$nearestFireStation",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalInspections,
      completedInspections,
      pendingInspections,
      totalApprovedNOCs,
      riskScoreDistribution,
      fireSafetyMeasures: fireSafetyMeasuresCount,
      nearestFireStationData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getMonthlyAnalytics };
