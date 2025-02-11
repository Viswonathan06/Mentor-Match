const Session = require('../models/Session');

// Create Session
exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Sessions with Filtering by Mentor or Student ID
exports.getSessions = async (req, res) => {
  try {
    const { mentorId, studentId } = req.query;
    let filter = {};

    if (mentorId) filter.mentorId = mentorId;
    if (studentId) filter.studentId = studentId;

    const sessions = await Session.find(filter)
      .populate('mentorId', 'expertise')
      .populate('studentId', 'name');
      
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

