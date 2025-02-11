const User = require('../models/User');
const Session = require('../models/Session'); // Assuming sessions are stored in a separate collection

// Get Student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Student Preferences
exports.updateStudentPreferences = async (req, res) => {
  const { preferences, languages } = req.body;

  try {
    // Ensure the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can update their preferences' });
    }

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'User not found' });

    student.preferences = preferences || student.preferences;
    student.languages = languages || student.languages;

    await student.save();
    res.status(200).json({ message: 'Preferences updated successfully', user: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book a Session with a Mentor
exports.bookSession = async (req, res) => {
  const { mentorId, sessionTime } = req.body;

  try {
    // Ensure the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can book sessions' });
    }

    const session = await Session.create({
      studentId: req.user.id,
      mentorId,
      sessionTime,
      status: 'upcoming',
    });

    res.status(201).json({ message: 'Session booked successfully', session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get Sessions for a Student
exports.getStudentSessions = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ studentId: id })
      .populate('mentorId', 'userId expertise')
      .populate('studentId', 'userId');

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Student Profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
