// const express = require("express");
// const { getMonthlyAnalytics } = require("../controllers/analyticsController"); // Adjust path as needed
// const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication

// const router = express.Router();

// // Define the analytics route with authentication middleware
// router.get("/analytics", authMiddleware, getMonthlyAnalytics);

// module.exports = router;


// const Inspection = require("../models/Inspection");
// const NOC = require("../models/NOC");

// const getMonthlyAnalytics = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//     // Total inspections, completed inspections, and pending inspections
//     const inspections = await Inspection.aggregate([
//       {
//         $match: {
//           date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }, // ✅ Removed .toISOString()
//         },
//       },
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
//       {
//         $match: {
//           date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
//           status: "rescheduled",
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalFollowUps: { $sum: 1 },
//         },
//       },
//     ]);

//     // Total NOC applications approved
//     const nocApplications = await NOC.aggregate([
//       {
//         $match: {
//           issuedOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }, // ✅ Ensure issuedOn field exists
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalApprovedNOCs: { $sum: 1 },
//         },
//       },
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

const express = require("express");
const router = express.Router();
const { getMonthlyAnalytics } = require("../controllers/analyticsController");

// ✅ Define Analytics Route
router.get("/monthly", getMonthlyAnalytics);

module.exports = router; // ✅ Export Router
