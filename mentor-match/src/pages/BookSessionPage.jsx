import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  Avatar,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // To access passed student info
import { fetchMentors } from "../services/api"; // Import API function to fetch mentors

const BookSessionPage = () => {
  const location = useLocation();
  const student = location.state?.student; // Get student info passed from homepage
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]); // List of all mentors
  const [filteredMentors, setFilteredMentors] = useState([]); // Filtered mentors
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [endTimeFilter, setEndTimeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [mentorSelections, setMentorSelections] = useState({}); // State to track selections for each mentor
  const [openDropdowns, setOpenDropdowns] = useState({}); // State to track which dropdown is open
  const [mentorColors, setMentorColors] = useState({}); // State to store fixed colors for each mentor
  // Fetch mentors on page load
  useEffect(() => {
    fetchMentors().then((data) => {
      // Add default availability if any field is missing
      const updatedMentors = data.map((mentor) => ({
        ...mentor,
        availability: {
          startTime: mentor.availability?.startTime || "08:00", // Default start time
          endTime: mentor.availability?.endTime || "20:00", // Default end time
          days: mentor.availability?.days || [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ], // Default days
        },
      }));
      // Assign fixed random colors for each mentor
      const colors = {};
      updatedMentors.forEach((mentor) => {
        colors[mentor._id] = getRandomColor();
      });

      setMentorColors(colors); // Save colors in state
      setMentors(updatedMentors);
      setFilteredMentors(updatedMentors);
    });
  }, []);

  // Close dropdown explicitly (e.g., on Cancel button click)
  const closeDropdown = (mentorId) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [mentorId]: false, // Explicitly close the dropdown for this mentor
    }));
  };

  // Handle filters
  const handleFilter = () => {
    let filtered = mentors;

    if (specializationFilter) {
      filtered = filtered.filter((mentor) =>
        mentor.specialization.includes(specializationFilter)
      );
    }

    if (startTimeFilter && endTimeFilter) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.availability.startTime <= startTimeFilter &&
          mentor.availability.endTime >= endTimeFilter
      );
    }

    if (languageFilter) {
      filtered = filtered.filter((mentor) =>
        mentor.languages.includes(languageFilter)
      );
    }

    setFilteredMentors(filtered);
  };

  // Update selections for a specific mentor
  const updateMentorSelection = (mentorId, field, value) => {
    setMentorSelections((prevSelections) => ({
      ...prevSelections,
      [mentorId]: {
        ...prevSelections[mentorId],
        [field]: value,
      },
    }));
  };

  // Toggle dropdown visibility for a specific mentor card
  const toggleDropdownVisibility = (mentorId) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [mentorId]: !prevOpenDropdowns[mentorId],
    }));
  };

  // Handle booking submission (dummy function for now)
  const handleSubmit = (mentorId) => {
    const selection = mentorSelections[mentorId];
    if (
      !selection ||
      !selection.selectedTime ||
      !selection.modeOfCommunication
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log("Booking Details:", {
      studentId: student.id,
      mentorId: mentorId,
      selectedTime: selection.selectedTime,
      modeOfCommunication: selection.modeOfCommunication,
    });

    alert("Session booked successfully!");
  };

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
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Book a Session
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
        {/* Specialization Filter */}
        <FormControl fullWidth sx={{ maxWidth: "250px" }}>
          <InputLabel>Specialization</InputLabel>
          <Select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[
              ...new Set(mentors.flatMap((mentor) => mentor.specialization)),
            ].map((specialization) => (
              <MenuItem key={specialization} value={specialization}>
                {specialization}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Availability Filter */}
        <TextField
          label="Start Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={startTimeFilter}
          onChange={(e) => setStartTimeFilter(e.target.value)}
          sx={{ maxWidth: "150px" }}
        />
        <TextField
          label="End Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={endTimeFilter}
          onChange={(e) => setEndTimeFilter(e.target.value)}
          sx={{ maxWidth: "150px" }}
        />

        {/* Language Filter */}
        <FormControl fullWidth sx={{ maxWidth: "250px" }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(mentors.flatMap((mentor) => mentor.languages))].map(
              (language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {/* Apply Filters Button */}
        <Button variant="contained" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Box>

      {/* Mentor Cards */}
      <Grid container spacing={3}>
        {filteredMentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor._id}>
            {/* Clickable Card */}
            <Card
              sx={{
                backgroundColor: mentorColors[mentor._id], // Use fixed color from state
                cursor: "pointer",
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

                {/* Dropdowns only visible when "Book Session" is clicked */}
                {openDropdowns[mentor._id] && (
                  <>
                    {/* Select Session Time */}
                    <FormControl
                      fullWidth
                      margin="normal"
                      variant="outlined" // Use outlined variant to prevent label overlap
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "black", // Optional: Customize label color
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "black", // Optional: Customize border color
                          },
                          "&:hover fieldset": {
                            borderColor: "black", // Optional: Border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black", // Optional: Border color when focused
                          },
                        },
                      }}
                    >
                      <InputLabel shrink>Select Time</InputLabel>
                      <Select
                        value={mentorSelections[mentor._id]?.selectedTime || ""}
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent card click
                          updateMentorSelection(
                            mentor._id,
                            "selectedTime",
                            e.target.value
                          );
                        }}
                        displayEmpty // Ensures placeholder text is visible

                      >
                        {Array.from(
                          new Array(
                            parseInt(
                              mentor.availability.endTime.split(":")[0]
                            ) -
                              parseInt(
                                mentor.availability.startTime.split(":")[0]
                              ) +
                              1
                          ),
                          (_, i) =>
                            `${String(
                              parseInt(
                                mentor.availability.startTime.split(":")[0]
                              ) + i
                            ).padStart(2, "0")}:00`
                        ).map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Select Mode of Communication */}
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Mode of Communication</InputLabel>
                      <Select
                        value={
                          mentorSelections[mentor._id]?.modeOfCommunication ||
                          ""
                        }
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent card click
                          updateMentorSelection(
                            mentor._id,
                            "modeOfCommunication",
                            e.target.value
                          );
                        }}
                      >
                        <MenuItem value="Zoom">Zoom</MenuItem>
                        <MenuItem value="Google Meet">Google Meet</MenuItem>
                        <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                        <MenuItem value="Mobile Call">Mobile Call</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Buttons with Padding */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      {/* Cancel Button */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{
                          mr: 1, // Add margin-right for spacing between buttons
                          color: "black", // Black text color
                          borderColor: "black", // Black border color
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight hover effect with a translucent background
                            borderColor: "black", // Keep the border black on hover
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          closeDropdown(mentor._id);
                        }}
                      >
                        Cancel
                      </Button>

                      {/* Book Session Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ ml: 1 }} // Add margin-left for spacing between buttons
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleSubmit(mentor._id);
                        }}
                      >
                        Book Session
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>

              {!openDropdowns[mentor._id] && (
                <CardActions>
                  {/* Toggle dropdown visibility */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      toggleDropdownVisibility(mentor._id);
                    }}
                  >
                    Book Session
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Mentors Found */}
      {filteredMentors.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No mentors found matching your criteria.
        </Typography>
      )}
    </Box>
  );
};

export default BookSessionPage;
