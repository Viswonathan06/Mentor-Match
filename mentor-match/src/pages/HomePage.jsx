import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Button,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchMentors, fetchSessionsByUser } from "../services/api"; // Replace with your API functions
import { UserContext } from "../context/UserContext"; // Import UserContext

const HomePage = () => {
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]); // State to store sessions
  const { user, loading } = useContext(UserContext); // Access logged-in user
  const [sessionloading, setLoading] = useState(true); // Loading state
  const [mentorLoading, setMentorLoading] = useState(true); // Loading state

  const navigate = useNavigate();
  useEffect(() => {
    fetchMentors().then((data) => {
      setMentors(data);
      setMentorLoading(false);
    }); // Fetch mentors
    if (user) {
      // Fetch sessions based on user role
      fetchSessionsByUser(user.id, user.role)
        .then((data) => {
          // Sort sessions in reverse chronological order by date or time
          const sortedSessions = data.sort(
            (a, b) => new Date(b.session_time) - new Date(a.session_time)
          );
          setSessions(sortedSessions.slice(0, 3)); // Take the most recent 3 sessions
          setLoading(false);
          console.log("Fetched sessions:", sortedSessions);
        })
        .catch((err) => {
          console.error("Failed to fetch sessions:", err.message);
          setLoading(false);
        });
    }
  }, [user]);
// Handle Book A Session button click
const handleBookSessionClick = (mentor) => {
  if (user?.role === 'student') {
    navigate('/book-session', { state: { student: user, mentor } }); // Pass student and mentor info
  } else {
    alert('Only students can book sessions.');
  }
};
  if ((user && (loading || sessionloading)) || mentorLoading) {
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

  // Function to generate random colors for mentor cards
  const getRandomColor = () => {
    const colors = [
      "#FFCDD2",
      "#C8E6C9",
      "#BBDEFB",
      "#FFE0B2",
      "#D1C4E9",
      "#B2EBF2",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to get color based on session status
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

  if (!mentors.length) {
    return <Typography>Loading mentors...</Typography>;
  }

  // Limit mentors to the first two rows (e.g., first six mentors)
  const limitedMentors = mentors.slice(0, 6);

  return (
    <Box>
      {/* Welcome Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          backgroundImage: `url('/images/welcome.jpg')`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
          }}
        ></Box>
        <Box sx={{ position: "relative", textAlign: "center", color: "#fff" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome {user ? user.name + "!" : "to Mentor Map!"}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Discover experienced mentors from various fields and connect with
            them for guidance and learning.
          </Typography>
          {/* Show Book A Session button only if user exists and is a student */}
          {user?.role === 'student' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/book-session', { state: { student: user } })}
              sx={{ mt: 2 }}
            >
              Book A Session Now!
            </Button>
          )}
        </Box>
      </Box>

      {/* Recent Sessions Section */}
      {sessions.length > 0 && (
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Recent Sessions
          </Typography>
          <Grid container spacing={3}>
            {sessions.map((session) => (
              <Grid item xs={12} sm={6} md={4} key={session.id}>
                <Card
                  sx={{
                    backgroundColor: getStatusColor(session.status), // Color code based on session status
                    cursor: "pointer",
                    height: "150px", // Fixed card height for sessions
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      Student: {session.student_name}
                    </Typography>
                    <Typography>Time: {session.session_time}</Typography>
                    <Typography>
                      Mode: {session.mode || "Not specified"}
                    </Typography>
                    <Typography>Status: {session.status}</Typography>
                    <Rating value={session.rating} precision={0.5} readOnly />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Mentor List Section */}
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Featured Mentors
        </Typography>
        <Grid container spacing={3}>
          {limitedMentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor._id}>
              {/* Clickable Card */}
              <Card
                sx={{
                  backgroundColor: getRandomColor(), // Assign random background color
                  cursor: "pointer",
                  height: "170px", // Fixed card height for mentors
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
                onClick={() => navigate(`/mentor/${mentor._id}`)} // Navigate to mentor details page
              >
                <CardContent>
                  {/* Avatar and Name */}
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={mentor.pictureUrl || "/default-avatar.png"} // Display mentor's avatar or default image
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
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Prevent wrapping for single-line truncation
                    }}
                  >
                    Specialization:{" "}
                    {mentor.specialization?.join(", ") || "Not specified"}
                  </Typography>

                  {/* Bio (Optional) */}
                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Prevent wrapping for single-line truncation
                    }}
                  >
                    {mentor.bio?.slice(0, 100) || "No bio available."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* See More Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/all-mentors")}
          >
            See More Mentors
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
