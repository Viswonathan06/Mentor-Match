import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MentorPage from "./pages/MentorPage";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/Auth/LoginPage";
import AllMentorsPage from "./pages/AllMentorsPage";
import { UserProvider } from "./context/UserContext";
import SignupPage from "./pages/Auth/SignupPage";
import NavBar from "./components/NavBar";
import EditMentorPage from "./pages/EditMentorPage";
import Footer from "./components/Footer";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import the custom theme
import CompleteProfilePage from "./pages/CompleteProfilePage";
import FAQPage from "./components/FAQPage";
import ContactUsPage from "./components/ContactUsPage";
import BookSessionPage from "./pages/BookSessionPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <UserProvider>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <NavBar user={user} setUser={setUser} />
            <div style={{ marginTop: '64px', flex: 1 }}> {/* Add margin equal to Navbar height */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route
                path="/signup"
                element={<SignupPage setUser={setUser} />}
              />
              <Route path="/mentor/:id" element={<MentorPage />} />
              <Route
                path="/complete-profile"
                element={<CompleteProfilePage user={user} />}
              />

              {user && (
                <Route path="/edit-mentor/:id" element={<EditMentorPage />} />
              )}
              {/* Role-specific routes */}
              {user?.role === "mentor" && (
                <>
                  <Route
                    path="/mentor-dashboard"
                    element={<MentorDashboard user={user} />}
                  />
                  <Route path="/edit-mentor/:id" element={<EditMentorPage />} />
                </>
              )}
              {user?.role === "student" && (
                <Route
                  path="/student-dashboard"
                  element={<StudentDashboard />}
                />
              )}
              {user?.role === "admin" && (
                <Route path="/admin-dashboard" element={<AdminPage />} />
              )}
              <Route path="/all-mentors" element={<AllMentorsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/book-session" element={<BookSessionPage />} />
            </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
