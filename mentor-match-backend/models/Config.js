const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true, // Ensure each type is unique (e.g., "specializations", "daysOfWeek", "languages")
  },
  values: {
    type: [String], // Array of strings to store configuration values
    required: true,
  },
});

module.exports = mongoose.model('config', ConfigSchema);
