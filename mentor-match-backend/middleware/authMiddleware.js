const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig'); // Import dynamically generated secret

// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Use dynamically generated secret key
    req.user = decoded; // Attach decoded payload to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
