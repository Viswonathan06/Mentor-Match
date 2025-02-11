import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getMentorById, fetchConfigByType, updateMentorProfile } from '../services/api'; // Import API functions
import { UserContext } from '../context/UserContext'; // Import UserContext

const EditMentorPage = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { id } = useParams(); // Get mentor ID from URL
  const [userDetails, setUserDetails] = useState(null); // State to store mentor details
  const [loading, setLoading] = useState(true); // Loading state
  const [specializations, setSpecializations] = useState([]); // Specializations from config
  const [languages, setLanguages] = useState([]); // Languages from config
  const [daysOfWeek, setDaysOfWeek] = useState([]); // Days of the week from config
  const { logout } = useContext(UserContext); // Access login function from context

  // Fetch mentor details by ID and configurations
  const fetchData = async () => {
    try {
      const mentorData = await getMentorById(id);
      const [specializationsData, daysOfWeekData, languagesData] = await Promise.all([
        fetchConfigByType('specializations'),
        fetchConfigByType('daysOfWeek'),
        fetchConfigByType('languages'),
      ]);

      setUserDetails(mentorData);
      setSpecializations(specializationsData);
      setDaysOfWeek(daysOfWeekData);
      setLanguages(languagesData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
      setLoading(false);
    }
  };

  // Update userDetails dynamically when form fields change
  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="error">
          Failed to load mentor details.
        </Typography>
      </Box>
    );
  }

  // Save updated mentor details
  const handleSave = async () => {
    try {
      console.log(userDetails)
      const token = localStorage.getItem('token'); // Get token from localStorage
      console.log(token)
      await updateMentorProfile(userDetails, token); // Call API to update profile
      alert('Mentor details updated successfully!');
      navigate(`/mentor-dashboard`); // Redirect to mentor details page after saving
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        // Handle 403 Forbidden error
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        logout(); // Clear user context and localStorage
        alert('Login has timed-out. Please login again.');
        navigate('/login'); // Redirect to login page
      } else{
      console.error('Failed to update mentor details:', err.message);
      alert('Failed to save changes. Please try again.');
      }
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Edit Mentor Details
      </Typography>

      {/* Editable Fields */}
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={userDetails.name || ''}
        disabled // Make this field uneditable
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={userDetails.email || ''}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <TextField
        label="Bio"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={userDetails.bio || ''}
        onChange={(e) => handleInputChange('bio', e.target.value)}
      />

      {/* Specializations */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Specialization</InputLabel>
        <Select
          multiple
          value={userDetails.specialization || []}
          onChange={(e) =>
            handleInputChange(
              'specialization',
              typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
            )
          }
          renderValue={(selected) => selected.join(', ')}
        >
          {specializations.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={userDetails.specialization?.includes(item)} />
              {item}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">You can select multiple specializations.</Typography>
      </FormControl>

      {/* Preferred Days */}
      <Typography variant="h6" gutterBottom>
        Preferred Days
      </Typography>
      <FormGroup row>
        {daysOfWeek.map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={userDetails.availability?.days?.includes(day)}
                onChange={(e) => {
                  const updatedDays = e.target.checked
                    ? [...(userDetails.availability?.days || []), day]
                    : userDetails.availability?.days.filter((d) => d !== day);

                  handleInputChange('availability', {
                    ...userDetails.availability,
                    days: updatedDays,
                  });
                }}
              />
            }
            label={day}
          />
        ))}
      </FormGroup>

      {/* Preferred Languages */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Preferred Languages</InputLabel>
        <Select
          multiple
          value={userDetails.languages || []}
          onChange={(e) =>
            handleInputChange(
              'languages',
              typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
            )
          }
          renderValue={(selected) => selected.join(', ')}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              <Checkbox checked={userDetails.languages?.includes(language)} />
              {language}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">You can select multiple languages.</Typography>
      </FormControl>

      {/* Save Button */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditMentorPage;
