import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PublicJournals from "./pages/PublicJournals";
import MyJournals from "./pages/MyJournals";
import DetailedJournal from "./pages/DetailedJournal";
import CreateJournal from "./pages/CreateJournal";
import EditJournal from "./pages/EditJournal";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/adminDashboard";
import ManageUsers from "./components/ManageUsers";
import ManageJournals from "./components/ManageJournals";
import AdminDetailedJournal from "./pages/AdminDetailedJournal";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes"; // Import AdminProtectedRoutes
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { user } = useAuth(); // Access user object

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
            element={user?.role === "admin" ? <AdminDashboard /> : <Dashboard />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/public-journals" element={<PublicJournals />} />
          <Route path="/my-journals" element={<MyJournals />} />
          <Route path="/journal/:id" element={<DetailedJournal />} />
          <Route path="/create-journal" element={<CreateJournal />} />
          <Route path="/edit-journal/:id" element={<EditJournal />} />
        {/* Admin Routes */}
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-journals" element={<ManageJournals />} />
          <Route path="/admin/journal/:id" element={<AdminDetailedJournal />} />
        </Route>
        </Route>


        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
