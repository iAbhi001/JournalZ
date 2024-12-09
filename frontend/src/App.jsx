import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import PublicJournals from "./pages/PublicJournals";
import MyJournals from "./pages/MyJournals";
import Dashboard from "./pages/Dashboard";
import CreateJournal from "./pages/CreateJournal";
import EditJournal from "./pages/EditJournal";

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
        <Route
            path="/dashboard"
            element={  <Dashboard />}
          />
        <Route path="/public-journals" element={<PublicJournals />} />
        <Route path="/my-journals" element={<MyJournals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-journal" element={<CreateJournal />} />
        <Route path="/edit-journal/:id" element={<EditJournal />} />
     
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
