const mongoose = require("mongoose");

const identitySchema = new mongoose.Schema({
  aadhaarNumber: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true 
  },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
});


identitySchema.pre("save", function (next) {
  this.aadhaarNumber = String(this.aadhaarNumber).replace(/\s/g, ""); 
  next();
});

module.exports = mongoose.model("Identity", identitySchema);
