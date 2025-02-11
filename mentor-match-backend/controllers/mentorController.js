const User = require('../models/User');

// Get All Mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }); // Filter by role
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await User.findOne({ _id: req.params.id, role: 'mentor' });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or Update Mentor Profile
exports.createOrUpdateMentorProfile = async (req, res) => {
  const { specialization, availability, languages, bio} = req.body;

  try {
    // Ensure the user is a mentor
    if (req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Only mentors can update their profile' });
    }

    // Find the logged-in user by ID
    const mentor = await User.findById(req.user.id);
    if (!mentor) return res.status(404).json({ message: 'User not found' });

    // Update mentor-specific fields
    mentor.specialization = specialization || mentor.specialization;
    mentor.availability = availability || mentor.availability;
    mentor.languages = languages || mentor.languages;
    mentor.bio = bio || mentor.bio;

    await mentor.save();
    res.status(200).json({ message: 'Mentor profile updated successfully', user: mentor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Sessions for a Mentor

// Update Mentor Profile
exports.updateMentorProfile = async (req, res) => {
  try {
    const updatedMentor = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json(updatedMentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
