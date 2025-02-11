const crypto = require('crypto');

// Generate a secure random JWT secret key
const JWT_SECRET = crypto.randomBytes(8).toString('hex');

// Export the generated key
module.exports = {
  JWT_SECRET,
};
