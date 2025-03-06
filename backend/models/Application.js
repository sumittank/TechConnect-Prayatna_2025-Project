// const mongoose = require("mongoose");

// const ApplicationSchema = new mongoose.Schema({
//   ownerName: String,
//   email: String,
//   contact: String,
//   address: String,
//   buildingDetails: {
//     totalArea: String,
//     numFloors: String,
//     occupancyType: String,
//     height: String,
//   },
//   fireSafetyMeasures: [String],
//   waterStorage: String,
//   nearestFireStation: String,
//   documents: {
//     ownerPhoto: Object,
//     buildingPhoto: Object,
//     extinguisherPhoto: Object,
//     businessCert: Object,
//     aadharCard: Object,
//   },
// });

// module.exports = mongoose.model("Application", ApplicationSchema);



// const mongoose = require("mongoose");

// const ApplicationSchema = new mongoose.Schema({
//   ownerName: { type: String, required: true },
//   email: { type: String, required: true },
//   contact: String,
//   address: String,
//   remark: String,
//   inspectionStatus : Boolean,
//   status: { type: String, default: "Pending" }, // ✅ Added status field
//   buildingDetails: {
//     totalArea: String,
//     numFloors: String,
//     occupancyType: String,
//     height: String,
//   },
//   fireSafetyMeasures: [String],
//   waterStorage: String,
//   nearestFireStation: String,
//   documents: {
//     ownerPhoto: { type: Object, default: null },
//     buildingPhoto: { type: Object, default: null },
//     extinguisherPhoto: { type: Object, default: null },
//     businessCert: { type: Object, default: null },
//     aadharCard: { type: Object, default: null },
//   },
// });

// module.exports = mongoose.model("Application", ApplicationSchema);



const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  contact: String,
  address: String,
  businessName: { type: String, required: true }, // ✅ New Field (Manually Entered)
  submittedAt: { type: Date, default: Date.now }, // ✅ New Field (Auto-Generated)
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
