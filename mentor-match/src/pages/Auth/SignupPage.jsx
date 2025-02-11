import React, { useState , useContext} from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api'; // Import the API function
import { UserContext } from '../../context/UserContext'; // Import UserContext

const SignupPage = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [dialogMessage, setDialogMessage] = useState(''); // State for dialog message
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Access login function from context

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the signup data object
    const signupData = {
      name,
      email,
      password,
      role,
    };

    try {
      // Send the data to the backend
      const response = await registerUser(signupData);
      console.log(response);
      setDialogMessage('Signup successful! Redirecting to complete your profile.');
      setDialogOpen(true);
      // Save user details and token to localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);

      // Update user state
      setUser(response.user);
      login(response.user);
      // Redirect to Complete Profile Page after a short delay
      setTimeout(() => {
        navigate(`/edit-mentor/${response.user.id}`) // Redirect to edit page
      }, 2000);
    } catch (err) {
      setDialogMessage(`Signup failed: ${err.response?.data?.message || err.message}`);
      setDialogOpen(true);
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Selection */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="mentor">Mentor</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Signup
        </Button>
      </form>

      {/* Dialog for Success/Failure Message */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Signup Status</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SignupPage;
