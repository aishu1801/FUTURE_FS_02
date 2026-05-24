const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "New",
  },

  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Lead", LeadSchema);