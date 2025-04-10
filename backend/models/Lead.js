const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: String,
    address: String,
    status: { type: String, enum: ['Connected', 'Not Connected'], default: 'Not Connected' },
    response: String,
    callDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }, { timestamps: true });
  
  module.exports = mongoose.model("Lead", LeadSchema);