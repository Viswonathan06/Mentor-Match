import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Grid, Rating, Card, CardContent, CircularProgress } from '@mui/material';
import { getMentorById } from '../services/api'; // Mock API to fetch mentor details

const MentorPage = () => {
  const { id } = useParams(); // Get mentor ID from URL
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // Fetch mentor details using the ID
    getMentorById(id).then((data) => setMentor(data));
  }, [id]);

  if (!mentor) {
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
  const maskContact = (contact) => {
    if (!contact) return 'Not Provided';
    return contact.replace(/.(?=.{4})/g, '*'); // Mask all but last 4 characters
  };

  // Format availability as "<startTime> to <endTime> on <days>"
  const formatAvailability = (availability) => {
    console.log(availability);
    if (!availability || !availability.startTime || !availability.endTime || !availability.days) {
      return 'Not specified';
    }
    return `${availability.startTime} to ${availability.endTime} on ${availability.days.join(', ')}`;
  };

  return (
    <Box p={4}>
      {/* Mentor Header Section */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={mentor.picture}
          alt={mentor.name}
          sx={{ width: 120, height: 120, marginRight: 3 }}
        />
        <Box>
          <Typography variant="h4">{mentor.name}</Typography>
          <Typography color="textSecondary">{mentor.expertise}</Typography>
        </Box>
      </Box>

      {/* Mentor Details Section */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About {mentor.name}
              </Typography>
              <Typography>{mentor.bio || 'No bio available.'}</Typography>

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Preferred Timings
                </Typography>
                {/* Render formatted availability */}
                <Typography>{formatAvailability(mentor.availability)}</Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Languages
                </Typography>
                <Typography>{mentor.languages?.join(', ') || 'Not specified'}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Ratings Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ratings
              </Typography>
              {mentor.ratings?.length > 0 ? (
                <>
                  <Rating value={mentor.averageRating} precision={0.5} readOnly />
                  <Typography variant="body2">
                    Based on {mentor.ratings.length} reviews
                  </Typography>
                </>
              ) : (
                <Typography>No ratings yet.</Typography>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography>Email: {maskContact(mentor.email)}</Typography>
              <Typography>Phone Number: {maskContact(mentor.phone)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MentorPage;
