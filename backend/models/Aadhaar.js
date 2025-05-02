const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
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


aadhaarSchema.pre("save", function (next) {
  this.aadhaarNumber = this.aadhaarNumber.replace(/\s/g, ""); 
  next();
});

module.exports = mongoose.model("Aadhaar", aadhaarSchema);
