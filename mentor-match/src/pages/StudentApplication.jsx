// src/pages/StudentApplication.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { submitApplication } from '../services/api';

const StudentApplication = () => {
  const [mentorId, setMentorId] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async () => {
    try {
      await submitApplication({ mentorId, details });
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <Box p={4}>
      <TextField label="Preferred Mentor ID" fullWidth margin="normal" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
      <TextField label="Details about your request" fullWidth multiline rows={4} margin="normal" value={details} onChange={(e) => setDetails(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Application</Button>
    </Box>
  );
};

export default StudentApplication;
