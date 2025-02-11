import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api'; // Import the loginUser API function
import { UserContext } from '../../context/UserContext'; // Import UserContext

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Access login function from context

  const handleLogin = async () => {
    try {
      // Call the loginUser API function
      const response = await loginUser(email, password);

      // Save user details and token to localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);

      // Update user state
      setUser(response.user);
      login(response.user); // Update context and localStorage with logged-in user

      // Redirect to homepage
      navigate('/');
    } catch (err) {
      // Handle login errors
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Login</Typography>

      {/* Error Message */}
      {error && <Typography color="error" gutterBottom>{error}</Typography>}

      {/* Email Input */}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Login Button */}
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
