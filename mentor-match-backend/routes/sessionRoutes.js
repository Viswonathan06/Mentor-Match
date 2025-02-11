const express = require('express');
const { createSession, getSessions } = require('../controllers/sessionController');
const router = express.Router();

// Define routes
router.post('/', createSession);
router.get('/', getSessions);

module.exports = router; // Export the router object
