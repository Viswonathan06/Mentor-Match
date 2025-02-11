const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Sample route for testing the server setup (can be removed later)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import routes (to be implemented later)
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const configRoutes = require('./routes/configRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Use routes as middleware (to be implemented later)
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/config', configRoutes);

// Start the server on PORT from .env or default to 5000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(cors()); // Enable CORS for all routes


