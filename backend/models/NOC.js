const mongoose = require("mongoose");

const NOCSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  ownerName: { type: String, required: true },
  businessName : { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  nocUrl: { type: String, required: true },
  issuedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NOC", NOCSchema);
