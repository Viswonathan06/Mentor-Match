import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  CardHeader,
} from "@mui/material";
import { SessionContext } from "../context/SessionContext";
import { UserContext } from "../context/UserContext";
import { getMentorById } from "../services/api"; // Import API function to fetch mentor details
import { useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const { sessions, sessionLoading } = useContext(SessionContext); // Access session data
  const { user, loading } = useContext(UserContext);
  const [mentorDetails, setMentorDetails] = useState(null); // State to store mentor details
  const navigate = useNavigate(); // For navigation

  // Fetch mentor details by ID
  useEffect(() => {
    if (user && user.role === "mentor") {
      getMentorById(user.id).then((data) => setMentorDetails(data));
    }
  }, [user]);

  // Ensure the user is logged in and has the correct role
  if (!user || user.role !== "mentor") {
    return <Typography>You do not have access to this page.</Typography>;
  }

  if (loading || sessionLoading || !mentorDetails) {
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

  // Filter sessions for the logged-in mentor
  const mentorSessions = sessions.filter(
    (session) => session.mentor_id === user.id
  );

  // Categorize sessions by status
  const upcomingSessions = mentorSessions.filter(
    (session) => session.status === "upcoming"
  );
  const completedSessions = mentorSessions.filter(
    (session) => session.status === "completed"
  );
  const cancelledSessions = mentorSessions.filter(
    (session) => session.status === "cancelled"
  );

  // Color coding based on session status
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#d4edda"; // Green
      case "upcoming":
        return "#cce5ff"; // Blue
      case "cancelled":
        return "#f8d7da"; // Red
      default:
        return "#ffffff"; // Default white
    }
  };

  return (
    <Box p={4}>
      {/* Mentor Information Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={mentorDetails.pictureUrl || "/default-avatar.png"} // Dynamically load picture or show default avatar
            alt={mentorDetails.name}
            sx={{ width: 120, height: 120, marginRight: 3 }}
          />
          <Box>
            <Typography variant="h4">{mentorDetails.name}</Typography>
            <Typography color="textSecondary">
              Expertise: {mentorDetails.specialization?.join(", ") || "Not specified"}
            </Typography>
            <Typography color="textSecondary">
              Availability: {mentorDetails.availability?.startTime} to{" "}
              {mentorDetails.availability?.endTime} on{" "}
              {mentorDetails.availability?.days?.join(", ") || "Not specified"}
            </Typography>
          </Box>
          {/* Edit Information Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: "auto", height: "40px" }}
            onClick={() => navigate(`/edit-mentor/${user.id}`)} // Redirect to edit page
          >
            Edit Information
          </Button>
        </Box>
      </Card>

      {/* Contact Information Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography>Email: {mentorDetails.email || "Not provided"}</Typography>
          <Typography>Phone: {mentorDetails.phone || "Not provided"}</Typography>

          {/* Bio */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography>{mentorDetails.bio || "No bio available."}</Typography>
          </Box>

          {/* Links */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            {mentorDetails.links && mentorDetails.links.length > 0 ? (
              mentorDetails.links.map((link, index) => (
                <Typography key={index}>
                  -{" "}
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </Typography>
              ))
            ) : (
              <Typography>No links available.</Typography>
            )}
          </Box>

          {/* Note about masking */}
          <Box mt={2}>
            <Typography variant="body2" color="error">
              Note: Your contact information will be masked for students.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Session Management Section */}
      <Typography variant="h5" gutterBottom>
        Mentor Dashboard - Sessions
      </Typography>

      {/* Upcoming Sessions */}
      <SessionSection title="Upcoming Sessions" sessions={upcomingSessions} getStatusColor={getStatusColor} />

      {/* Completed Sessions */}
      <SessionSection title="Completed Sessions" sessions={completedSessions} getStatusColor={getStatusColor} />

      {/* Cancelled Sessions */}
      <SessionSection title="Cancelled Sessions" sessions={cancelledSessions} getStatusColor={getStatusColor} />
    </Box>
  );
};

// Reusable Session Section Component
const SessionSection = ({ title, sessions, getStatusColor }) => (
  <>
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {title} ({sessions.length})
      </Typography>
      {sessions.length > 0 ? (
        <Grid container spacing={3}>
          {sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Card sx={{ backgroundColor: getStatusColor(session.status), height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardHeader title={`Student: ${session.student_name}`} subheader={`Time: ${session.session_time}`} />
                <CardContent>
                  <Typography>Status: {session.status}</Typography>
                  {session.rating && (
                    <Typography>Rating: {session.rating}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No sessions available.</Typography>
      )}
    </Box>
  </>
);

export default MentorDashboard;
