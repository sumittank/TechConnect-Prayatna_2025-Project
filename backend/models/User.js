const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['applicant', 'officer', 'admin'], required: true },
    uniqueKey: { type: String }, // Required for officers and admins
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
