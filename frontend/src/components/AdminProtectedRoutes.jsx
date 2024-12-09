import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminProtectedRoutes = () => {
  const { user } = useAuth();

  // Check if the user is an admin
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />; // Redirect non-admin users to the main dashboard
  }

  return <Outlet />; // Allow access for admins
};

export default AdminProtectedRoutes;
