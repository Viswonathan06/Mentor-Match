import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#000000', // Black background
        color: '#ffffff', // White text
        padding: '16px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      {/* Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '24px', mb: 2 }}>
        <Typography
          variant="body1"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/contact-us')}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/faq')}
        >
          FAQ
        </Typography>
      </Box>

      {/* Social Media Icons */}
      <Box>
        <IconButton
          aria-label="Instagram"
          sx={{ color: '#ffffff' }} // White icon color
          onClick={() => window.open('https://www.instagram.com/', '_blank')}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          aria-label="LinkedIn"
          sx={{ color: '#ffffff' }} // White icon color
          onClick={() => window.open('https://www.linkedin.com/', '_blank')}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>

      {/* Footer Text */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Mentor Map. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
