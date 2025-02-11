import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Import Material-UI Home Icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard Icon
import LogoutIcon from '@mui/icons-material/Logout'; // Logout Icon
import { UserContext } from '../context/UserContext'; // Import UserContext


const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const { logout } = useContext(UserContext); // Access login function from context
  const [open, setOpen] = useState(false); // State to control the dialog visibility

  // Handle opening the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle confirming logout
  const handleConfirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // Reset user state
    logout(); // Clear user context and localStorage
    navigate('/login'); // Redirect to login page
    setOpen(false); // Close the dialog
  };

  return (
    <>
      {/* Navigation Bar */}
    <AppBar position="fixed" sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // White with transparency
        backdropFilter: 'blur(10px)', // Apply frosted glass effect
        boxShadow: 'none', // Remove default shadow for a cleaner look
        color: '#ffffff', // White text/icons for contrast
        height: '64px', // Fixed height for consistency
}}>
      <Toolbar>
        {/* Platform Name */}
        <Typography variant="h6" 
        sx={{ flexGrow: 1 , cursor: 'pointer' }} onClick={() => navigate('/')}>
          Mentor Map
        </Typography>
        {/* Home Button */}
        <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
          <HomeIcon /> {/* Home Icon */}
        </IconButton>
      {/* Role-Specific Navigation */}
      {user?.role === 'mentor' && (
          <IconButton color="inherit" onClick={() => navigate('/mentor-dashboard')}>
            <DashboardIcon /> {/* Dashboard Icon */}
          </IconButton>
        )}

        {user?.role === "admin" && (
          <IconButton color="inherit" onClick={() => navigate('/admin-dashboard')}>
            <DashboardIcon /> {/* Dashboard Icon */}
          </IconButton>
        )}
        {user?.role === "student" && (
          <IconButton color="inherit" onClick={() => navigate('/student-dashboard')}>
          <DashboardIcon /> {/* Dashboard Icon */}
        </IconButton>

        )}
        {!user && location.pathname !== '/signup' && (
          <Button color="inherit" onClick={() => navigate('/signup')}>
            Signup
          </Button>
        )}

        {/* Login Button (hide if on login page) */}
        {!user && location.pathname !== '/login' && (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
        {/* Logout Button */}
        {user && (
          <IconButton color="inherit" onClick={handleOpen}>
            <LogoutIcon /> {/* Logout Icon */}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
    {/* Logout Confirmation Dialog */}
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? You will need to log in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavBar;
