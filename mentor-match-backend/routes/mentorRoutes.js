const express = require('express');
const { getAllMentors, getMentorById, createOrUpdateMentorProfile } = require('../controllers/mentorController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllMentors); // Get all mentors
router.get('/:id', getMentorById); // Get a specific mentor by ID
router.post('/profile', authenticateToken, createOrUpdateMentorProfile); // Create or update a mentor profile

module.exports = router;
