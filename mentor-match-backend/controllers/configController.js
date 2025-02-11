const Config = require('../models/Config'); // Import Config model

// Fetch configuration by type
exports.getConfigByType = async (req, res) => {
  const { type } = req.params;

  try {
    const config = await Config.findOne({ type: new RegExp(`^${type}$`, 'i') }); // Case-insensitive regex
    if (!config) {
      return res.status(404).json({ message: `Configuration for ${type} not found.` });
    }
    res.status(200).json(config.values);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching configuration.', error: err.message });
  }
};
