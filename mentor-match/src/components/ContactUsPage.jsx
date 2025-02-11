import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Message Field */}
        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactUsPage;
