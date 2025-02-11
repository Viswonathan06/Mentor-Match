import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateMentorProfile } from '../services/api'; // Import API function

const CompleteProfilePage = () => {
  const location = useLocation(); // Access state passed from SignupPage
  const navigate = useNavigate();
  
  const { name, email, role } = location.state || {}; // Destructure user data from state

  const [bio, setBio] = useState('');
  const [contactEmail, setContactEmail] = useState(email || '');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Mentor-specific fields
  const [preferredDays, setPreferredDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // Preferences (for mentors)
  const [preferredModeOfContact, setPreferredModeOfContact] = useState('');

  // Days of the week options
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare profile data object
    const profileData = {
      bio,
      contactInfo: {
        email: contactEmail || null,
        phone: phoneNumber || null,
      },
    };

    if (role === 'mentor') {
      profileData.availability = { startTime, endTime, days: preferredDays };
      profileData.specialization = specialization.split(',').map((item) => item.trim());
      profileData.preferredModeOfContact = preferredModeOfContact;
    }

    try {
      await updateMentorProfile(profileData); // Send data to backend API
      alert('Profile updated successfully!');
      navigate('/dashboard'); // Redirect to dashboard after completion
    } catch (err) {
      console.error('Error updating profile:', err.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>

      {/* Unchangeable Fields */}
      <TextField label="Name" fullWidth margin="normal" value={name} disabled />
      <TextField label="Email" fullWidth margin="normal" value={email} disabled />
      <TextField label="Role" fullWidth margin="normal" value={role} disabled />

      {/* Bio */}
      <TextField
        label="Bio"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      {/* Contact Information */}
      <TextField
        label="Contact Email (Optional)"
        type="email"
        fullWidth
        margin="normal"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      />
      
      <TextField
        label="Phone Number (Optional)"
        type="tel"
        fullWidth
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      {/* Mentor-Specific Fields */}
      {role === 'mentor' && (
        <>
          {/* Preferred Days */}
          <Typography variant="h6">Preferred Days</Typography>
          <FormGroup row>
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={preferredDays.includes(day)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferredDays([...preferredDays, day]);
                      } else {
                        setPreferredDays(preferredDays.filter((d) => d !== day));
                      }
                    }}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>

          {/* Start Time */}
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required={!startTime && preferredDays.length > 0}
          />

          {/* End Time */}
          <TextField
            label="End Time"
            type="time"
            fullWidth
            margin="normal"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required={!endTime && preferredDays.length > 0}
          />

          {/* Specialization */}
          <TextField
            label="Specialization (comma-separated)"
            fullWidth
            margin="normal"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required={!specialization}
          />

           {/* Preferred Mode of Contact */}
           <FormControl fullWidth margin="normal">
             <InputLabel>Preferred Mode of Contact</InputLabel>
             <Select value={preferredModeOfContact} onChange={(e) => setPreferredModeOfContact(e.target.value)}>
               <MenuItem value={'Zoom'}>Zoom</MenuItem>
               <MenuItem value={'Google Meet'}>Google Meet</MenuItem>
               <MenuItem value={'Mobile Call'}>Mobile Call</MenuItem>
               <MenuItem value={'WhatsApp'}>WhatsApp</MenuItem>
             </Select>
           </FormControl>
         </>
       )}

       {/* Submit Button */}
       <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt:3 }} onClick={handleSubmit}>
         Complete Profile 
       </Button> 
     </Box>);
};

export default CompleteProfilePage;
