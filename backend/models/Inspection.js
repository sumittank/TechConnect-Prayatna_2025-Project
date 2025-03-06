// const mongoose = require("mongoose");

// const InspectionSchema = new mongoose.Schema({
//     applicationId: { type: String, required: true, unique: true },
//     requiresInspection: { type: Boolean, default: false },
//     reason: { type: String, default: "" },
//     inspector: { type: String, default: "" },
//     date: { type: String, default: "" },
//     time: { type: String, default: "" }
// });

// module.exports = mongoose.model("Inspection", InspectionSchema);

// const mongoose = require("mongoose");

// const InspectionSchema = new mongoose.Schema({
//   applicationId: {
//     type: String, // Assuming it's a MongoDB ObjectId
//     required: true,
//     default:"",
//     // ref: "Application", // Reference to Application model (if exists)
//   },
//   requiresInspection: {
//     type: Boolean,
//     required: true,
//   },
//   reason: {
//     type: String,
//     default: "",
//   },
//   inspector: {
//     type: String,
//     default: "",
//   },
//   date: {
//     type: String, // Storing as string to keep format flexible (YYYY-MM-DD)
//     default: "",
//   },
//   time: {
//     type: String, // Storing time separately for easy manipulation
//     default: "",
//   },
// });

// const Inspection = mongoose.model("Inspection", InspectionSchema);
// module.exports = Inspection;




const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    default: "",
  },
  requiresInspection: {
    type: Boolean,
    required: true,
  },
  reason: {
    type: String,
    default: "",
  },
  inspector: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "completed", "rescheduled"],
    default: "pending",
  },
  statusFinalized: { 
    type: Boolean, 
    default: false
  }
});

const Inspection = mongoose.model("Inspection", InspectionSchema);
module.exports = Inspection;

