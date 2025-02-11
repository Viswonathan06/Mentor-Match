const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'student', 'admin'], required: true },
  specialization: { 
    type: [String], // Array of specializations (e.g., "ReactJS", "Data Science")
  },
  availability: {
    startTime: { type: String }, // Start time in HH:mm format
    endTime: { type: String },   // End time in HH:mm format
    days: { type: [String], default: [] },   // Available Days
  },
  languages: { 
    type: [String], // Array of languages (e.g., "English", "Spanish")
  },
  averageRating: { 
    type: Number, // Average rating (calculated dynamically)
    default: 0,   // Default value is 0
  },
  // Student-specific fields (can be extended as needed)
  preferences: { type: [String], default: [] }, // Learning preferences (e.g., "Video calls")
  ratings: { type: [Number], default: [] }, // Learning preferences (e.g., "Video calls")
    // Mentor-specific fields (can be extended as needed)
});

module.exports = mongoose.model('User', userSchema);
