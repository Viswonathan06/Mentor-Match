import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchMentors } from '../services/api';

// Function to generate random colors
const getRandomColor = () => {
  const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFE0B2', '#D1C4E9', '#B2EBF2'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const AllMentorsPage = () => {
  const [mentors, setMentors] = useState([]); // State to store mentor data
  const navigate = useNavigate();

  // Fetch mentors on page load
  useEffect(() => {
    fetchMentors().then((data) => setMentors(data));
  }, []);

  if (!mentors.length) {
    return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        All Mentors
      </Typography>
      <Grid container spacing={3}>
        {mentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor._id}>
            {/* Mentor Card */}
            <Card
              sx={{
                backgroundColor: getRandomColor(), // Assign random background color
                cursor: 'pointer',
                height: '170px', // Fixed card height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' },
              }}
              onClick={() => navigate(`/mentor/${mentor._id}`)} // Navigate to mentor details page
            >
              <CardContent>
                {/* Avatar and Name */}
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={mentor.pictureUrl || '/default-avatar.png'} // Display mentor's avatar or default image
                    alt={mentor.name}
                    sx={{ width: 56, height: 56, marginRight: 2 }}
                  />
                  <Typography variant="h5" noWrap>
                    {mentor.name}
                  </Typography>
                </Box>

                {/* Specialization */}
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // Prevent wrapping for single-line truncation
                  }}
                >
                  Specialization: {mentor.specialization?.join(', ') || 'Not specified'}
                </Typography>

                {/* Bio (Optional) */}
                <Typography
                  variant="body2"
                  mt={2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // Prevent wrapping for single-line truncation
                  }}
                >
                  {mentor.bio?.slice(0, 100) || 'No bio available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllMentorsPage;
