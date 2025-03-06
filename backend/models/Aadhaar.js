// const mongoose = require("mongoose");

// const aadhaarSchema = new mongoose.Schema({
//   aadhaarNumber: { type: String, unique: true, required: true },
//   name: String,
//   dob: String,
//   gender: String,
// });

// module.exports = mongoose.model("Aadhaar", aadhaarSchema);

const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
  aadhaarNumber: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true  // Ensures no leading or trailing spaces
  },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
});

// Ensure aadhaarNumber is always stored without spaces
aadhaarSchema.pre("save", function (next) {
  this.aadhaarNumber = this.aadhaarNumber.replace(/\s/g, ""); 
  next();
});

module.exports = mongoose.model("Aadhaar", aadhaarSchema);
