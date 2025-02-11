const express = require('express');
const { getStudentById, updateStudentPreferences, bookSession } = require('../controllers/studentController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', getStudentById); // Get a specific student by ID
router.post('/preferences', authenticateToken, updateStudentPreferences); // Update student preferences
router.post('/book-session', authenticateToken, bookSession); // Book a session with a mentor

module.exports = router;
