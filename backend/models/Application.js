const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  contact: String,
  address: String,
  businessName: { type: String, required: true }, 
  submittedAt: { type: Date, default: Date.now }, 
  remark: String,
  inspectionStatus: Boolean,
  status: { type: String, default: "Pending" },
  riskScore: { type: String, default: "Not Predicted" },
  buildingDetails: {
    totalArea: String,
    numFloors: String,
    occupancyType: String,
    height: String,
  },
  fireSafetyMeasures: [String],
  waterStorage: String,
  nearestFireStation: String,
  documents: {
    ownerPhoto: { type: Object, default: null },
    buildingPhoto: { type: Object, default: null },
    extinguisherPhoto: { type: Object, default: null },
    businessCert: { type: Object, default: null },
    aadharCard: { type: Object, default: null },
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
