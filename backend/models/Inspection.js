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

