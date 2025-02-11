const express = require('express');
const { getConfigByType } = require('../controllers/configController');
const router = express.Router();

// Define route to fetch configuration by type
router.get('/:type', getConfigByType);

module.exports = router;
