import axios from "axios";

// Base URL for the backend API
const BASE_URL = "http://localhost:8000"; // Replace with your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMentorById = async (id) => {
  const response = await api.get(`/api/mentors/${id}`);
  return response.data;
};

// Helper function to add Authorization header dynamically
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Auth APIs
export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (signupData) => {
  const response = await api.post("/api/auth/register", signupData);
  return response.data;
};

// Mentor APIs
export const fetchMentors = async () => {
  const response = await api.get("/api/mentors");
  console.log(response.data);
  return response.data;
};

export const updateMentorProfile = async (profileData, token) => {
  setAuthToken(token); // Add token to headers
  const response = await api.post("/api/mentors/profile", profileData);
  return response.data;
};

// Student APIs
export const getStudentById = async (id, token) => {
  setAuthToken(token); // Add token to headers
  const response = await api.get(`/api/students/${id}`);
  return response.data;
};

export const updateStudentPreferences = async (preferences, token) => {
  setAuthToken(token); // Add token to headers
  const response = await api.put("/api/students/preferences", { preferences });
  return response.data;
};

export const bookSession = async (mentorId, sessionTime, token) => {
  setAuthToken(token); // Add token to headers
  const response = await api.post("/api/students/book-session", {
    mentorId,
    sessionTime,
  });
  return response.data;
};

export const fetchStudents = () => {
  return Promise.resolve([
    { id: 1, name: "Alice", email: "alice@example.com", preferredMentorId: 1 },
    { id: 2, name: "Bob", email: "bob@example.com", preferredMentorId: null },
  ]);
};

export const addMentor = (data) => {
  console.log("Adding mentor:", data);
  return Promise.resolve({ success: true });
};

export const addStudentApplication = (data) => {
  console.log("Submitting student application:", data);
  return Promise.resolve({ success: true });
};

export const fetchAdmins = () => api.get("/admins");

export const addStudent = (data) => api.post("/students", data);
export const addAdmin = (data) => api.post("/admins", data);
export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);
export const submitApplication = (data) =>
  api.post("/students/application", data);


// Fetch sessions based on user role
export const fetchSessionsByUser = async (userId, role) => {
  try {
    const queryParam = role === 'mentor' ? `mentorId=${userId}` : `studentId=${userId}`;
    const response = await axios.get(`${BASE_URL}/api/sessions?${queryParam}`);
    return response.data; // Return the fetched sessions
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    throw err;
  }
};
// Fetch configuration by type (e.g., specializations, daysOfWeek, languages)
export const fetchConfigByType = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/config/${type}`);
    return response.data; // Returns the array of values for the given type
  } catch (err) {
    throw new Error(`Failed to fetch configuration for type "${type}": ${err.message}`);
  }
};

export const fetchSessions = () => {
  // Mock session data (replace this with an actual API call in the future)
  const mockSessions = [
    {
      id: 1,
      student_id: 101,
      student_name: "Alice Johnson",
      mentor_id: 201,
      mentor_name: "John Doe",
      session_time: "2024-12-26 10:00 AM",
      rating: 5,
      status: "completed",
    },
    {
      id: 2,
      student_id: 102,
      student_name: "Bob Smith",
      mentor_id: 201,
      mentor_name: "John Doe",
      session_time: "2024-12-27 2:00 PM",
      rating: 4,
      status: "completed",
    },
    {
      id: 3,
      student_id: 103,
      student_name: "Charlie Brown",
      mentor_id: 202,
      mentor_name: "Jane Smith",
      session_time: "2024-12-28 11:00 AM",
      rating: 4,
      status: "upcoming",
    },
    {
      id: 4,
      student_id: 104,
      student_name: "Diana Prince",
      mentor_id: 201,
      mentor_name: "John Doe",
      session_time: "2024-12-29 3:00 PM",
      rating: 5,
      status: "upcoming",
    },
    {
      id: 5,
      student_id: 105,
      student_name: "Eve Adams",
      mentor_id: 201,
      mentor_name: "John Doe",
      session_time: "2024-12-25 9:00 AM",
      rating: null,
      status: "cancelled",
    },
  ];

  return Promise.resolve(mockSessions);
};

export default api;
