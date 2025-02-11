import React, { useContext } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, CardContent } from '@mui/material';
import { SessionContext } from '../context/SessionContext';
import { UserContext } from '../context/UserContext';

const StudentDashboard = () => {
  const { sessions, loading } = useContext(SessionContext); // Access session data
  const { user } = useContext(UserContext); // Access logged-in user's info

  // Ensure the user is logged in and has the correct role
  if (!user || user.role !== 'student') {
    return <Typography>You do not have access to this page.</Typography>;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Filter sessions for the logged-in student
  const studentSessions = sessions.filter((session) => session.student_id === user.id);

  // Categorize sessions by status
  const upcomingSessions = studentSessions.filter((session) => session.status === 'upcoming');
  const completedSessions = studentSessions.filter((session) => session.status === 'completed');
  const cancelledSessions = studentSessions.filter((session) => session.status === 'cancelled');

  // Color coding based on session status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#d4edda'; // Green
      case 'upcoming':
        return '#cce5ff'; // Blue
      case 'cancelled':
        return '#f8d7da'; // Red
      default:
        return '#ffffff'; // Default white
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Student Dashboard
      </Typography>

      {/* Upcoming Sessions */}
      <Typography variant="h6" gutterBottom>
        Upcoming Sessions
      </Typography>
      <Grid container spacing={2}>
        {upcomingSessions.map((session) => (
          <Grid item xs={12} md={6} key={session.id}>
            <Card sx={{ backgroundColor: getStatusColor(session.status) }}>
              <CardContent>
                <Typography variant="h6">Mentor: {session.mentor_name}</Typography>
                <Typography>Time: {session.session_time}</Typography>
                <Typography>Status: {session.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Completed Sessions */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Completed Sessions
        </Typography>
        <Grid container spacing={2}>
          {completedSessions.map((session) => (
            <Grid item xs={12} md={6} key={session.id}>
              <Card sx={{ backgroundColor: getStatusColor(session.status) }}>
                <CardContent>
                  <Typography variant="h6">Mentor: {session.mentor_name}</Typography>
                  <Typography>Time: {session.session_time}</Typography>
                  <Typography>Rating: {session.rating || 'No rating provided'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cancelled Sessions */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Cancelled Sessions
        </Typography>
        <Grid container spacing={2}>
          {cancelledSessions.map((session) => (
            <Grid item xs={12} md={6} key={session.id}>
              <Card sx={{ backgroundColor: getStatusColor(session.status) }}>
                <CardContent>
                  <Typography variant="h6">Mentor: {session.mentor_name}</Typography>
                  <Typography>Time: {session.session_time}</Typography>
                  <Typography>Status: {session.status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
