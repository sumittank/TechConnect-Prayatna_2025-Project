// const Inspection = require("../models/Inspection.js");
// const NOC = require("../models/NOC.js");
// const mongoose = require("mongoose");
// const getMonthlyAnalytics = async (req, res) => {
//     try {
//       const currentDate = new Date();
//       const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//       const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//       const userId = req.user._id;
//     // Total inspections, completed inspections, and pending inspections for the user
//       const inspections = await Inspection.aggregate([
//         {
//           $match: {
//             inspector: userId.toString(),
//             date: { $gte: firstDayOfMonth.toISOString(), $lte: lastDayOfMonth.toISOString() },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalInspections: { $sum: 1 },
//             completedInspections: {
//               $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
//             },
//             pendingInspections: {
//               $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
//             },
//           },
//         },
//       ]);
      
//       // Total follow-ups (rescheduled inspections) for the user
//     const followUps = await Inspection.aggregate([
//         {
//           $match: {
//             inspector: userId.toString(),
//             date: { $gte: firstDayOfMonth.toISOString(), $lte: lastDayOfMonth.toISOString() },
//             status: "rescheduled",
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalFollowUps: { $sum: 1 },
//           },
//         },
//       ]);

//        // Total NOC applications approved for the user
//     const nocApplications = await NOC.aggregate([
//         {
//           $match: {
//             email: req.user.email, // Assuming the email is used to track NOC ownership
//             issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalApprovedNOCs: { $sum: 1 },
//           },
//         },
//       ]);

//       const analyticsData = res.status(200).json({
//         totalInspections: inspections[0]?.totalInspections || 0,
//         completedInspections: inspections[0]?.completedInspections || 0,
//         pendingInspections: inspections[0]?.pendingInspections || 0,
//         totalFollowUps: followUps[0]?.totalFollowUps || 0,
//         totalApprovedNOCs: nocApplications[0]?.totalApprovedNOCs || 0,
//       });

//       console.log(analyticsData)

//     }catch(error){
//         console.error("Error fetching analytics:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     } 
// } 

// module.exports = {getMonthlyAnalytics};


// const Inspection = require("../models/Inspection");
// const NOC = require("../models/NOC");

// const getMonthlyAnalytics = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//     // Total inspections, completed inspections, and pending inspections
//     const inspections = await Inspection.aggregate([
//       { $match: { date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
//       {
//         $group: {
//           _id: null,
//           totalInspections: { $sum: 1 },
//           completedInspections: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
//           pendingInspections: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
//         },
//       },
//     ]);

//     // Total follow-ups (rescheduled inspections)
//     const followUps = await Inspection.aggregate([
//       { $match: { date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }, status: "rescheduled" } },
//       { $group: { _id: null, totalFollowUps: { $sum: 1 } } },
//     ]);

//     // Total NOC applications approved
//     const nocApplications = await NOC.aggregate([
//       { $match: { issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
//       { $group: { _id: null, totalApprovedNOCs: { $sum: 1 } } },
//     ]);

//     // ✅ Return analytics
//     res.status(200).json({
//       totalInspections: inspections[0]?.totalInspections || 0,
//       completedInspections: inspections[0]?.completedInspections || 0,
//       pendingInspections: inspections[0]?.pendingInspections || 0,
//       totalFollowUps: followUps[0]?.totalFollowUps || 0,
//       totalApprovedNOCs: nocApplications[0]?.totalApprovedNOCs || 0,
//     });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { getMonthlyAnalytics };


// const Inspection = require("../models/Inspection");
// const NOC = require("../models/NOC");
// const Application = require("../models/Application");

// const getMonthlyAnalytics = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//     // 🟢 Total Inspections, Completed & Pending Inspections
//     const inspections = await Inspection.aggregate([
//       { $match: { date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // 🟢 Total Approved NOCs
//     const totalApprovedNOCs = await NOC.countDocuments({
//       issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
//     });

//     // 🟢 Risk Score Distribution (Grouped by Score Ranges)
//     const riskScoreDistribution = await Application.aggregate([
//       { $match: { submittedAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
//       {
//         $group: {
//           _id: {
//             $switch: {
//               branches: [
//                 { case: { $lte: ["$riskScore", 20] }, then: "Low (0-20)" },
//                 { case: { $lte: ["$riskScore", 50] }, then: "Moderate (21-50)" },
//                 { case: { $lte: ["$riskScore", 80] }, then: "High (51-80)" },
//               ],
//               default: "Critical (81-100)",
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // 🟢 Fire Safety Measures Count
//     const fireSafetyMeasuresCount = await Application.aggregate([
//       { $unwind: "$fireSafetyMeasures" },
//       {
//         $group: {
//           _id: "$fireSafetyMeasures",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // 🟢 Nearest Fire Station Distribution
//     const nearestFireStationData = await Application.aggregate([
//       {
//         $group: {
//           _id: "$nearestFireStation",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // 🟢 Format the Response
//     res.status(200).json({
//       totalInspections: inspections.reduce((acc, cur) => acc + cur.count, 0),
//       completedInspections: inspections.find((i) => i._id === "completed")?.count || 0,
//       pendingInspections: inspections.find((i) => i._id === "pending")?.count || 0,
//       totalApprovedNOCs,
//       riskScoreDistribution,
//       fireSafetyMeasures: fireSafetyMeasuresCount,
//       nearestFireStationData,
//     });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { getMonthlyAnalytics };

const Inspection = require("../models/Inspection");
const NOC = require("../models/NOC");
const Application = require("../models/Application");

const getMonthlyAnalytics = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // 🟢 Total Inspections & Status-wise Breakdown
    // const inspections = await Inspection.aggregate([
    //   { $match: { date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
    //   {
    //     $group: {
    //       _id: "$status",
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

    const allInspections = await Inspection.find({});

    // 🟢 Convert `date` string to actual Date object for filtering
    const inspections = allInspections.filter((inspection) => {
      const inspectionDate = new Date(inspection.date); // Convert string to Date
      return inspectionDate >= firstDayOfMonth && inspectionDate <= lastDayOfMonth;
    });


    // const totalInspections = inspections.reduce((acc, cur) => acc + cur.count, 0);
    // const completedInspections = inspections.find((i) => i.status === "completed")?.count || 0;
    // const pendingInspections = inspections.find((i) => i.status === "pending")?.count || 0;

    const totalInspections = inspections.length;
    const completedInspections = inspections.filter(i => i.status === "completed").length;
    const pendingInspections = inspections.filter(i => i.status === "pending").length;

    // 🟢 Total Approved NOCs
    const totalApprovedNOCs = await NOC.countDocuments({
      issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    // 🟢 Risk Score Distribution
    // const riskScoreDistribution = await Application.aggregate([
    //   { $match: { submittedAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
    //   {
    //     $group: {
    //       _id: {
    //         $switch: {
    //           branches: [
    //             { case: { $lte: ["$riskScore", 20] }, then: "Low (0-20)" },
    //             { case: { $lte: ["$riskScore", 50] }, then: "Moderate (21-50)" },
    //             { case: { $lte: ["$riskScore", 80] }, then: "High (51-80)" },
    //           ],
    //           default: "Critical (81-100)",
    //         },
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

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
                onError: 0, // If conversion fails (e.g., "Not Predicted"), default to 0
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
      
      

    // 🟢 Fire Safety Measures Count
    const fireSafetyMeasuresCount = await Application.aggregate([
      { $unwind: "$fireSafetyMeasures" },
      {
        $group: {
          _id: "$fireSafetyMeasures",
          count: { $sum: 1 },
        },
      },
    ]);

    // 🟢 Nearest Fire Station Data
    const nearestFireStationData = await Application.aggregate([
      {
        $group: {
          _id: "$nearestFireStation",
          count: { $sum: 1 },
        },
      },
    ]);

    // 🟢 Send the response
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
