const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // For password hashing and comparison
const jwt = require('jsonwebtoken'); // For generating and verifying JWT tokens
const { JWT_SECRET } = require('../config/jwtConfig'); // Import dynamically generated secret

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role, specialization, availability, preferences, languages } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
      availability,
      preferences,
      languages
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET, // Use dynamically generated secret key
      { expiresIn: '6h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET, // Use dynamically generated secret key
      { expiresIn: '6h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
